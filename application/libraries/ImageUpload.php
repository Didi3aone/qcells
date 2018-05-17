<?php
  class ImageUpload {
    private $src;
    private $data;
    private $file;
    private $dst;
    private $type;
    private $extension;
    private $msg = "OK";
    private $folder_name;
    private $file_name;
    private $target_w;
    private $target_h;
    private $watermark = false;
    private $is_multiple = false;
    private $multiple_index = 0;
    private $fontFilePath = "";
    private $fontSize = 12;
    private $thumb_height;
    private $thumb_width;
    private $is_thumb = false;
    private $thumb = "";
    private $thumb_folder;

    function __construct() {
    }
    
    /**
     * Upload image with cropping GD feature
     *  $params = array();            --> params is an array of configurations, in single method call, you can resize an image into multiple sizes, folders, etc.
        $params["mysize"] = array(    --> this is one of the configuration, you can name it anything you want.
            "isMultiple"    => true,                    --> if multiple files
            "multipleIndex" => 0,                       --> index of multiple files
            "folder"        => "upload/test",                               --> will upload to destination folder (from www/...), will create the folder if not exists yet.
            "target_size"   => array ("width" => 100, "height" => 100),     --> the target width and height after resize. if empty or 0 then use the image size 
            "data"          => true,        --> json data , {x:0, y:0, width:100, heigh:100, rotate:0}
            "watermark"     => "idev.com",  --> for wartermarking with text
            "thumb"     => array(
                                'folder' => 'upload/test/thumb',
                                'height' => 50,
                                'width' => 50,
                            )
        );
        $params["mysize_2"] = array(         
            "isMultiple"    => true,                    
            "multipleIndex" => 1,                       
            "folder"        => "upload/test", 
            "target_size"   => array ("width" => 150, "height" => 150),    
            "data"          => true,       
            "watermark"     => "idev.com", 
        );
     */
    function clearData () {
        $this->src = "";
        $this->data = "";
        $this->file = "";
        $this->dst = "";
        $this->type = "";
        $this->extension = "";
        $this->msg = "OK";
        $this->folder_name = "";
        $this->file_name = "";
        $this->target_w = 0;
        $this->target_h = 0;
        $this->watermark = false;
        $this->is_multiple = false;
        $this->multiple_index = 0;
        $this->fontFilePath = FCPATH."assets/fonts/ChangaOne-Regular.ttf";
        $this->fontSize = 12;
        $this->thumb_height;
        $this->thumb_width;
        $this->is_thumb = false;
        $this->thumb = "";
        $this->thumb_folder;
    }
    
    function init ($files,$params) {
        $result_image = array();
        foreach ($params as $key => $mode) {
            $this->clearData () ;
            $this -> setFolder($mode['folder']);
            if (isset($mode['watermark']) && ($mode['watermark'] !== false && $mode['watermark'] !== true) ) {
                $this -> setWatermark($mode['watermark']);
            }
            if (isset($mode['isMultiple']) && isset($mode['multipleIndex']) ) {
                $this -> setMultiple($mode['isMultiple'], $mode['multipleIndex']);
            }
            $this -> setFileName($mode['filename'],$files);
            // $this -> setSrc($mode['src']);
            if(!isset($mode['data'])) {
                $mode['data'] = json_encode(array(
                    'x' => 0,
                    'y' => 0,
                    'width' => 0,
                    'height' => 0,
                    'rotate' => 0,
                ));
            }
            $this -> setData($mode['data']);
            if (!isset($mode['target_size']) ) {
                $mode['target_size'] = array();
            }
            $this -> setTargetSize($mode['target_size']);
            $this -> setFile($files);
            if(isset($mode['thumb'])) {
                $this->is_thumb = true;
                $this->setThumb ($mode['thumb']);
            }
            $this -> crop($this -> src, $this -> dst, $this -> data);
            $result_image[$key] = array(
                'image' => $this->getResult(),
                'message' => $this-> getMsg(),
                'thumb' => $this->getThumb(),
                'filename' => $this->file_name,
            );
        }
        
        return $result_image;
    }
    
    private function setWatermark ($watermark) {
        $this -> watermark = $watermark;
    }
    
    private function setMultiple ($is_multiple, $multiple_index) {
        $this -> is_multiple = $is_multiple;
        $this -> multiple_index = $multiple_index;
    }
    
    private function setTargetSize ($size) {
        if (isset($size['width']) && $size['width'] != 0) {
            $this -> target_w = $size['width'];
        } else {
            $this -> target_w = $this -> data -> width;
        }
        if (isset($size['height']) && $size['height'] != 0) {
            $this -> target_h = $size['height'];
        } else {
            $this -> target_h = $this -> data -> height;
        }
    }
    
    private function setFolder ($folder) {
        $this -> folder_name = $folder;
    }
    
    private function setFileName ($file_name,$file){
        if ($this->is_multiple === true && $file_name == "") {
            $filename = explode(".",$file['name'][$this->multiple_index]);
        } else if ($this->is_multiple === false && $file_name == "") {
            $filename = explode(".",$file['name']);
        } else {
            $filename = explode(".",$file_name);
        }
        
        if (count($filename) > 1) array_pop($filename);
        $filename = implode('.', $filename);
        $this -> file_name = $filename;
    }

    private function setSrc($src) {
      if (!empty($src)) {
        $type = exif_imagetype($src);

        if ($type) {
          $this -> src = $src;
          $this -> type = $type;
          $this -> extension = image_type_to_extension($type);
          $this -> setDst();
        }
      }
    }

    private function setData($data) {
      if (!empty($data)) {
        $this -> data = json_decode(stripslashes($data));
      }
    }
    
    private function setThumb ($thumb) {
        $this->thumb_folder = $thumb['folder'];
        $this->thumb_height = $thumb['height'];
        $this->thumb_width = $thumb['width'];
        //create folder if not exists yet.
        if (!file_exists(FCPATH.$this -> thumb_folder)) {
            mkdir(FCPATH.$this -> thumb_folder, 0777, true);
            chmod(FCPATH.$this -> thumb_folder , 0777);
        }
        
        $this -> thumb = $this -> thumb_folder."/" . $this -> file_name . "_" . strtotime("now") . '.jpg';
    }

    private function setFile($file) {
      if ($this->is_multiple === true) {
        $file_tmp_name = $file['tmp_name'][$this->multiple_index];
        $file_error_code = $file['error'][$this->multiple_index];
      } else {
        $file_tmp_name = $file['tmp_name'];
        $file_error_code = $file['error'];
      }
      
      $errorCode = $file_error_code;

      if ($errorCode === UPLOAD_ERR_OK) {
        $type = exif_imagetype($file_tmp_name);

        if ($type) {
          $extension = image_type_to_extension($type);
          $src = $this -> folder_name . strtotime("now") . '.original' . $extension;

          if ($type == IMAGETYPE_GIF || $type == IMAGETYPE_JPEG || $type == IMAGETYPE_PNG) {

            if (file_exists(FCPATH. $src)) {
              unlink(FCPATH.$src);
            }
            
            // umask(0666);
            //create folder if not exists yet.
            if (!file_exists(FCPATH.$this -> folder_name)) {
                mkdir(FCPATH.$this -> folder_name."/", 0777, true);
                chmod(FCPATH.$this -> folder_name."/", 0777);
            }
            
            
            $result = move_uploaded_file($file_tmp_name, FCPATH. $src);

            if ($result) {
              $this -> src = $src;
              $this -> type = $type;
              $this -> extension = $extension;
              $this -> setDst();
            } else {
               $this -> msg = 'Failed to save file';
            }
          } else {
            $this -> msg = 'Please upload image with the following types: JPG, PNG, GIF';
          }
        } else {
          $this -> msg = 'Please upload image file';
        }
      } else {
        $this -> msg = $this -> codeToMessage($errorCode);
      }
    }

    private function setDst() {
        $this -> dst = $this -> folder_name."/" . $this -> file_name . "_" . strtotime("now") . '.jpg';
    }

    private function crop($src, $dst, $data) {
      if (!empty($src) && !empty($dst) && !empty($data)) {
        switch ($this -> type) {
          case IMAGETYPE_GIF:
            $src_img = imagecreatefromgif($src);
            break;

          case IMAGETYPE_JPEG:
            $src_img = imagecreatefromjpeg($src);
            break;

          case IMAGETYPE_PNG:
            $src_img = imagecreatefrompng($src);
            break;
        }

        if (!$src_img) {
          $this -> msg = "Failed to read the image file";
          return;
        }

        $size = getimagesize($src);
        $size_w = $size[0]; // natural width
        $size_h = $size[1]; // natural height

        $src_img_w = $size_w;
        $src_img_h = $size_h;
        
        if ($this->target_w == 0) $this->target_w = $size_w;
        if ($this->target_h == 0) $this->target_h = $size_h;

        $degrees = $data -> rotate;

        // Rotate the source image
        if (is_numeric($degrees) && $degrees != 0) {
          // PHP's degrees is opposite to CSS's degrees
          $new_img = imagerotate( $src_img, -$degrees, imagecolorallocatealpha($src_img, 0, 0, 0, 127) );

          imagedestroy($src_img);
          $src_img = $new_img;

          $deg = abs($degrees) % 180;
          $arc = ($deg > 90 ? (180 - $deg) : $deg) * M_PI / 180;

          $src_img_w = $size_w * cos($arc) + $size_h * sin($arc);
          $src_img_h = $size_w * sin($arc) + $size_h * cos($arc);

          // Fix rotated image miss 1px issue when degrees < 0
          $src_img_w -= 1;
          $src_img_h -= 1;
        }

        $tmp_img_w = $data -> width;
        $tmp_img_h = $data -> height;
        $dst_img_w = $this -> target_w;
        $dst_img_h = $this -> target_h;

        $src_x = $data -> x;
        $src_y = $data -> y;
        if ($data -> width != 0 && $data -> height != 0) {
            if ($src_x <= -$tmp_img_w || $src_x > $src_img_w) {
              $src_x = $src_w = $dst_x = $dst_w = 0;
            } else if ($src_x <= 0) {
              $dst_x = -$src_x;
              $src_x = 0;
              $src_w = $dst_w = min($src_img_w, $tmp_img_w + $src_x);
            } else if ($src_x <= $src_img_w) {
              $dst_x = 0;
              $src_w = $dst_w = min($tmp_img_w, $src_img_w - $src_x);
            }

            if ($src_w <= 0 || $src_y <= -$tmp_img_h || $src_y > $src_img_h) {
              $src_y = $src_h = $dst_y = $dst_h = 0;
            } else if ($src_y <= 0) {
              $dst_y = -$src_y;
              $src_y = 0;
              $src_h = $dst_h = min($src_img_h, $tmp_img_h + $src_y);
            } else if ($src_y <= $src_img_h) {
              $dst_y = 0;
              $src_h = $dst_h = min($tmp_img_h, $src_img_h - $src_y);
            }

            // Scale to destination position and size
            $ratio = $tmp_img_w / $dst_img_w;
            $dst_x /= $ratio;
            $dst_y /= $ratio;
            $dst_w /= $ratio;
            $dst_h /= $ratio;
        } else {
            # taller
            if ($src_img_h > $dst_img_h) {
                $dst_w = ($dst_img_h / $src_img_h) * $src_img_w;
                $dst_h = $dst_img_h;
            }

            # wider
            if ($src_img_w > $dst_img_w) {
                $dst_w = ($dst_img_w / $src_img_w) * $src_img_h;
                $dst_h = $dst_img_w;
            }
            
            #if same size with original
            if ($src_img_h == $dst_img_h && $src_img_w == $dst_img_w) {
                $dst_w = $dst_img_w;
                $dst_h = $dst_img_h;
            }
            
            $dst_x = $dst_y = $src_x = $src_y = 0;
            
            $src_w = $size_w;
            $src_h = $size_h;
        }

        $dst_img = imagecreatetruecolor($dst_img_w, $dst_img_h);

        // Add transparent background to destination image
        // imagefill($dst_img, 0, 0, imagecolorallocatealpha($dst_img, 0, 0, 0, 127));
        imagefill($dst_img, 0, 0, imagecolorallocatealpha($dst_img, 255,255,255, 127));
        imagesavealpha($dst_img, true);
        
        // Watermark
        if ($this->watermark !== false) {
            //add watermark
            //5% of the whole image area will be used for watermark text area
            $acceptableWatermarkArea = ($dst_img_w * $dst_img_h) * 0.05;
            
            $shouldDisplayTextVertical = false;
            if ($dst_img_w < $dst_img_h) {
                $shouldDisplayTextVertical = true;
            }
            
            $fontAreaTotal = 0;
            
            //Find the required font size to fill the acceptable watermark area. This will change based on the original image size
            while ($acceptableWatermarkArea > $fontAreaTotal) {
                $fontArea = $this->CalcFontArea($this->fontFilePath, $this->fontSize, $this->watermark, $shouldDisplayTextVertical);
                $fontAreaTotal = $fontArea['area'];

                if ($this->fontSize > 90) {//Max Font Size is 90px for Watermark 
                    break;
                }
                $this->fontSize = $this->fontSize + 2;
            }
            
            $fontAreaDetail = $this->CalcFontArea($this->fontFilePath, $this->fontSize - 2, $this->watermark, $shouldDisplayTextVertical);
            
            $im = imagecreatetruecolor($fontAreaDetail['width'], $fontAreaDetail['height']);
            imageSaveAlpha($im, true);
            imagealphablending($im, false);
            
            $bg = imagecolorallocatealpha($im, 175, 175, 175, 127);
            imagefilledrectangle($im, 0, 0, $fontAreaDetail['width'], $fontAreaDetail['height'], $bg);

            $text = imagecolorallocatealpha($im, 255, 255, 255, 100);
            
            $textXPos = 0;
            $textYPos = 0;
            $angle = 0;
            $watermarkXPos = 0;
            $watermarkYPos = 0;
            
            //To find the position at which, the watermark should be printed
            if ($shouldDisplayTextVertical) {
                $textXPos = $fontAreaDetail['width'];
                $textYPos = $fontAreaDetail['height'] - 10;
                $angle = 90;
                $watermarkXPos = 10;
                $watermarkYPos = ($dst_img_h / 2) - ($fontAreaDetail['height'] / 2);
            } else {
                $textXPos = 10;
                $textYPos = $fontAreaDetail['height'] - 10;
                $angle = 0;
                $watermarkXPos = ($dst_img_w / 2) - ($fontAreaDetail['width'] / 2);
                // $watermarkYPos = $dst_img_h - $fontAreaDetail['height'];
                $watermarkYPos = $dst_img_h/2;
            }
            //Converts watermark text to image
            imagettftext($im, $fontAreaDetail['fontsize'] - 2, $angle, $textXPos, $textYPos, $text, $this->fontFilePath, $this->watermark);
        }

        $result = imagecopyresampled($dst_img, $src_img, $dst_x, $dst_y, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h);
        
        if ($this->watermark !== false) 
            imagecopy($dst_img, $im, $watermarkXPos, $watermarkYPos, 0, 0, $fontAreaDetail['width'], $fontAreaDetail['height']);
        
        if ($this->is_thumb) {
            $thumb = imagecreatetruecolor($this->thumb_width, $this->thumb_height);
            imagealphablending($thumb, false);
            imagesavealpha($thumb, true);
            $result_thumb = imagecopyresampled($thumb, $dst_img, 0, 0, $dst_x, $dst_y, $this->thumb_width, $this->thumb_height, $dst_w, $dst_h);
        }

        if ($result) {
          if (!imagejpeg($dst_img, $dst, 100)) {
            $this -> msg = "Failed to save the cropped image file";
          }
        } else if (!$result) {
          $this -> msg = "Failed to crop the image file";
        }
        
        if ($this->is_thumb && $result_thumb) {
            if (!imagejpeg($thumb, $this->thumb, 100)) {
                $this -> msg = "Failed to save the cropped image file";
            }
        } else if ($this->is_thumb && !$result_thumb ) {
          $this -> msg = "Failed to crop the image file";
        }

        imagedestroy($src_img);
        imagedestroy($dst_img);
        if ($this->watermark !== false) { imagedestroy($im); }
        if ($this->is_thumb !== false) { imagedestroy($thumb); }
        if ($this->src) unlink(FCPATH.$this->src);
      }
    }
    
    function generate_image_thumbnail($source_image_path, $thumbnail_image_path)
    {
        list($source_image_width, $source_image_height, $source_image_type) = getimagesize($source_image_path);
        switch ($source_image_type) {
            case IMAGETYPE_GIF:
                $source_gd_image = imagecreatefromgif($source_image_path);
                break;
            case IMAGETYPE_JPEG:
                $source_gd_image = imagecreatefromjpeg($source_image_path);
                break;
            case IMAGETYPE_PNG:
                $source_gd_image = imagecreatefrompng($source_image_path);
                break;
        }
        if ($source_gd_image === false) {
            return false;
        }
        $source_aspect_ratio = $source_image_width / $source_image_height;
        $thumbnail_aspect_ratio = THUMBNAIL_IMAGE_MAX_WIDTH / THUMBNAIL_IMAGE_MAX_HEIGHT;
        if ($source_image_width <= THUMBNAIL_IMAGE_MAX_WIDTH && $source_image_height <= THUMBNAIL_IMAGE_MAX_HEIGHT) {
            $thumbnail_image_width = $source_image_width;
            $thumbnail_image_height = $source_image_height;
        } elseif ($thumbnail_aspect_ratio > $source_aspect_ratio) {
            $thumbnail_image_width = (int) (THUMBNAIL_IMAGE_MAX_HEIGHT * $source_aspect_ratio);
            $thumbnail_image_height = THUMBNAIL_IMAGE_MAX_HEIGHT;
        } else {
            $thumbnail_image_width = THUMBNAIL_IMAGE_MAX_WIDTH;
            $thumbnail_image_height = (int) (THUMBNAIL_IMAGE_MAX_WIDTH / $source_aspect_ratio);
        }
        $thumbnail_gd_image = imagecreatetruecolor($thumbnail_image_width, $thumbnail_image_height);
        imagecopyresampled($thumbnail_gd_image, $source_gd_image, 0, 0, 0, 0, $thumbnail_image_width, $thumbnail_image_height, $source_image_width, $source_image_height);
        imagejpeg($thumbnail_gd_image, $thumbnail_image_path, 100);
        imagedestroy($source_gd_image);
        imagedestroy($thumbnail_gd_image);
        return true;
    }
    
    private function CalcFontArea($fontFilePath, $fontSize, $text, $isVertical = false) {

        $angle = 0;
        if ($isVertical) {
            $angle = 90;
        }

        $fontBox = imageftbbox($fontSize, $angle, $fontFilePath, $text);
        $fontArea = array();
        $fontArea['width'] = abs($fontBox[4] - $fontBox[0]) + 10;
        $fontArea['height'] = abs($fontBox[5] - $fontBox[1]) + 10;
        $fontArea['area'] = $fontArea['width'] * $fontArea['height'];
        $fontArea['fontsize'] = $fontSize;
        return $fontArea;
    }

    private function codeToMessage($code) {
      switch ($code) {
        case UPLOAD_ERR_INI_SIZE:
          $message = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
          break;

        case UPLOAD_ERR_FORM_SIZE:
          $message = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
          break;

        case UPLOAD_ERR_PARTIAL:
          $message = 'The uploaded file was only partially uploaded';
          break;

        case UPLOAD_ERR_NO_FILE:
          $message = 'No file was uploaded';
          break;

        case UPLOAD_ERR_NO_TMP_DIR:
          $message = 'Missing a temporary folder';
          break;

        case UPLOAD_ERR_CANT_WRITE:
          $message = 'Failed to write file to disk';
          break;

        case UPLOAD_ERR_EXTENSION:
          $message = 'File upload stopped by extension';
          break;

        default:
          $message = 'Unknown upload error';
      }

      return $message;
    }

    public function getResult() {
        return !empty($this -> data) ? "/".$this -> dst : $this -> src;
    }
    
    public function getThumb () {
        return "/".$this->thumb;
    }

    public function getMsg() {
      return $this -> msg;
    }
  }
