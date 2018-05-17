<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product_manager extends MX_Controller {

	private $_title 		= "Product";
    private $_title_page 	= '<i class="fa-fw fa fa-cubes"></i> Product';
    private $_breadcrumb 	= "<li><a href='".MANAGER_HOME."'>Home</a></li>";
    private $_active_page 	= "product";
    private $_back 			= "/qcell/manager/product/list_product";
    private $_js_path 		= "assets/js/pages/product/product/";
    private $_view_folder 	= "product/";

    //inisial for get table
    private $_table 		= "tbl_product";
    private $_table_aliases = "tp";
    private $_pk 			= "tp.ProductId";
    private $_tbl_category 	= "tbl_category_product";
    private $_tbl_alias_cat = "tcp";
    private $_pk_cat 		= "tcp.CategoryId";

    protected $_dm;

    public function __construct() {
    	parent::__construct();

    	//load and prepare Dynamic_model
        $this->load->model('Dynamic_model');
        $this->_dm = new Dynamic_model();
    }

	/**
    * List Product 
    */
    public function list_product() {
        //set header attribute.
        $header = array(
            "title"         => $this->_title,
            "title_page"    => $this->_title_page . '<span>> List  Product </span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb . '<li> Product</li>',
        );

        //set footer attribute (additional script and css).
        $footer = array(
            "script" => array(
                "assets/js/plugins/datatables/jquery.dataTables.min.js",
                "assets/js/plugins/datatables/dataTables.bootstrap.min.js",
                "assets/js/plugins/datatable-responsive/datatables.responsive.min.js",
                $this->_js_path . "list.js",
            ),
        );

        //load the views.
        $this->load->view(MANAGER_HEADER , $header);
        $this->load->view($this->_view_folder . 'index');
        $this->load->view(MANAGER_FOOTER , $footer);
    }

    /**
    * Create an Product Category
    */
    public function create () {
        $this->_breadcrumb .= '<li><a href="/qcell/manager/product/product">Product</a></li>';

        //prepare header title.
        $header = array(
            "title"         => $this->_title,
            "title_page"    => $this->_title_page . '<span>> Create Product</span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb . '<li>Create Product</li>',
            "back"          => $this->_back,
        );

        $footer = array(
            "script" => array(
                "assets/js/plugins/tinymce/tinymce.min.js",
                $this->_js_path . "create.js",
                "assets/js/plugins/select2.min.js",
                "assets/js/plugins/lightbox/js/lightbox.min.js"
            ),
            "css"    => array(
                "assets/js/plugins/lightbox/css/lightbox.css"
            )
        );

        //load the view.
        $this->load->view(MANAGER_HEADER, $header);
        $this->load->view($this->_view_folder . 'create');
        $this->load->view(MANAGER_FOOTER, $footer);
    }

    /**
     * Edit an product category
     */
    public function edit ($id = null) {
        $this->_breadcrumb .= '<li><a href="/qcell/manager/product/list_product">Product</a></li>';
        
        $params = array(
            "select"        => $this->_table_aliases.".*,".$this->_tbl_alias_cat.".CategoryName",
            "conditions"    => array("ProductId" => $id),
            "joined"        => array(
                    $this->_tbl_category." ".$this->_tbl_alias_cat => array(
                    $this->_tbl_alias_cat." ".$this->_pk_cat => $this->_table_aliases.".ProductCategoryId"
                )
            ),
            "row_array"     => true
        );
        //get the data.
        $data['item'] = $this->_dm->set_model($this->_table, $this->_table_aliases, $this->_pk)->get_all_data($params)['datas'];
        // print_r($data['item']);


        //prepare header title.
        $header = array(
            "title"         => $this->_title,
            "title_page"    => $this->_title_page . '<span>> Edit Product</span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb . '<li>Edit Product</li>',
            "back"          => $this->_back,
        );

        $footer = array(
            "script" => array(
                $this->_js_path . "create.js",
                "assets/js/plugins/tinymce/tinymce.min.js",
                "assets/js/plugins/select2.min.js",
            )
        );

        //load the view.
        $this->load->view(MANAGER_HEADER, $header);
        $this->load->view($this->_view_folder . 'create', $data);
        $this->load->view(MANAGER_FOOTER, $footer);
    }

    /**
     * Set validation rule for admin create and edit
     */
    private function _set_rule_validation() {

        //prepping to set no delimiters.
        $this->form_validation->set_error_delimiters('', '');

        //validates.
        $this->form_validation->set_rules("name", "Name", "trim|required");
        $this->form_validation->set_rules("price", "Price", "trim|required");
        $this->form_validation->set_rules("description", "Description", "trim|required");
        $this->form_validation->set_rules("product_category_id", "Category Product", "trim|required");
    }


    ////////////////////////////// AJAX CALL ////////////////////////////////////
    /**
     * Function to get list_all_data product category
     */
    public function list_all_data() {
        //must ajax and must get.
        if (!$this->input->is_ajax_request() || $this->input->method(true) != "GET") {
            exit('No direct script access allowed');
        }

        //sanitize and get inputed data
        $sort_col = sanitize_str_input($this->input->get("order")['0']['column'], "numeric");
        $sort_dir = sanitize_str_input($this->input->get("order")['0']['dir']);
        $limit 	  = sanitize_str_input($this->input->get("length"), "numeric");
        $start 	  = sanitize_str_input($this->input->get("start"), "numeric");
        $search   = sanitize_str_input($this->input->get("search")['value']);
        $filter   = $this->input->get("filter");

        $select = array(
        	"ProductId",
        	"ProductName",
        	"ProductPrice",
            "ProductDiscount",
            "ProductPriceFix",
        	$this->_tbl_alias_cat.".CategoryName",
        	"ProductDescription"
        );
        $joined = array( 
        	$this->_tbl_category." ".$this->_tbl_alias_cat => array(
        		$this->_tbl_alias_cat." ".$this->_pk_cat => $this->_table_aliases.".ProductCategoryId"
        	)
        );
        $column_sort = $select[$sort_col];

        //initialize.
        $data_filters = array();
        $conditions = array();

        if (count ($filter) > 0) {
            foreach ($filter as $key => $value) {
                $value = sanitize_str_input($value);
                switch ($key) {
                    case 'id':
                        if ($value != "") {
                            $data_filters['lower(id)'] = $value;
                        }
                        break;

                    case 'kategori':
                        if ($value != "") {
                            $data_filters['lower(dpc.name)'] = $value;
                        }
                        break;

                    case 'names':
                        if ($value != "") {
                            $data_filters['lower(dp.name)'] = $value;
                        }
                        break;

                    case 'description':
                        if ($value != "") {
                            $data_filters['lower(description)'] = $value;
                        }
                        break;

                    case 'show':
                        if ($value != "") {
                            $data_filters['dp.is_show'] = ($value == "active") ? 1 : 0;
                        }
                        break;

                    case 'in_filter': 
                        if ($value != "") {
                            $data_filters['show_in_filter'] = ($value == "active") ? 1 : 0;
                        }
                        break;

                    case 'hot_item':
                        if ($value != "") {
                            $data_filters['is_hot_item'] = ($value == "active") ? 0 : 1;
                        }
                        break;

                    default:
                        break;
                }
            }
        }

        //get data
        $datas = $this->_dm->set_model($this->_table, $this->_table_aliases, $this->_pk)->get_all_data(array(
            'select'            => $select,
            'left_joined'       => $joined,
            'order_by'          => array($column_sort => $sort_dir),
            'limit'             => $limit,
            'start'             => $start,
            'conditions'        => $conditions,
            'filter'            => $data_filters,
            "count_all_first"   => true,
            "debug"             => false
        ));
        // pr($datas);exit;

        //get total rows
        $total_rows = $datas['total'];

        $output = array(
            "data" => $datas['datas'],
            "draw" => intval($this->input->get("draw")),
            "recordsTotal" => $total_rows,
            "recordsFiltered" => $total_rows,
        );

        //encoding and returning.
        $this->output->set_content_type('application/json');
        echo json_encode($output);
        exit;
    }

    /**
     * Method to process adding or editing via ajax post.
    */
    public function process_form() {
        //must ajax and must post.
        if (!$this->input->is_ajax_request() || $this->input->method(true) != "POST") {
            exit('No direct script access allowed');
        }
        //load form validation lib.
        $this->load->library('form_validation');

        //initial.
        $message['is_error'] = true;
        $message['error_msg'] = "";
        $message['redirect_to'] = "";

        //sanitize input (id is primary key, if from edit, it has value).
        $id                     = sanitize_str_input($this->input->post('id'));
        $product_category_id    = sanitize_str_input($this->input->post('product_category_id'));
        $code                   = sanitize_str_input($this->input->post('code'));
        $price                  = sanitize_str_input($this->input->post('price'));
        $pricefix               = sanitize_str_input($this->input->post('pricefix'));
        $discount               = $this->input->post('discount');
        $name                   = sanitize_str_input($this->input->post('name'));
        $description            = sanitize_str_input($this->input->post('description'));
        $data_image_large       = $this->input->post('data-image');
        $create_by              = $this->session->userdata("UserId");

        // pr($this->input->post());exit();
        //server side validation.
        $this->_set_rule_validation();

        //checking.
        if ($this->form_validation->run($this) == FALSE) {

            //validation failed.
            $message['error_msg'] = validation_errors();

        } else {
            $this->load->library('Uploader');

            if(isset($_FILES['image-url'])){
                $image_pro = $this->upload_image("qcellfile", "upload/product", "image-url", $data_image_large, 325, 400, $id);
            }
            
            //begin transaction.
            $this->db->trans_begin();

            //validation success, prepare array to DB.
            $arrayToDB = array(
        		"ProductCode" 			=> $code,
        		"ProductName" 			=> $name,
        		"ProductPrice" 			=> $price,
        		"ProductPriceFix" 		=> $pricefix,
        		"ProductDiscount" 		=> $discount."%",
        		"ProductCategoryId" 	=> $product_category_id,
        		"ProductDescription" 	=> $description
            );

            if (!empty($image_pro)) {
                $arrayToDB['ProductPhoto'] = $image_pro;
            }

            //insert or update?
            if ($id == "") {
                //insert date
                $arrayToDB['ProductCreatedDate'] = date("Y-m-d H:i:s");
                //insert to DB.
                $result = $this->_dm->set_model($this->_table, $this->_table_aliases, $this->_pk)->insert($arrayToDB);

                //end transaction.
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $message['error_msg'] = 'database operation failed.';

                } else {
                    $this->db->trans_commit();

                    $message['is_error'] = false;

                    //success.
                    //growler.
                    $message['notif_title'] = "Good!";
                    $message['notif_message'] = "New Product has been added.";

                    //on insert, not redirected.
                    $message['redirect_to'] = "/qcell/manager/product/list_product";
                }
            } else {
                //insert updated date 
                $arrayToDB['ProductUpdatedDate'] = date("Y-m-d H:i:s");
                //get current slider data
                $curr_data = $this->_dm->set_model($this->_table, $this->_table_aliases, $this->_pk)->get_all_data(array(
                    "find_by_pk" => array($id),
                    "row_array" => true,
                ))['datas'];

                //update.
                if (!empty($image_pro) && isset($curr_data['ProductPhoto']) && !empty($curr_data['ProductPhoto'])) {
                    unlink( FCPATH . $curr_data['ProductPhoto'] );
                }

                //condition for update.
                $condition = array("ProductId" => $id);
                $result = $this->_dm->set_model($this->_table, $this->_table_aliases, $this->_pk)->update($arrayToDB, $condition);

                //end transaction.
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $message['error_msg'] = 'database operation failed.';

                } else {
                    $this->db->trans_commit();

                    $message['is_error'] = false;

                    //success.
                    //growler.
                    $message['notif_title'] = "Excellent!";
                    $message['notif_message'] = "Product has been updated.";

                    //on update, redirect.
                    $message['redirect_to'] = "/qcell/manager/product/list_product";
                }
            }
        }
        //encoding and returning.
        $this->output->set_content_type('application/json');
        echo json_encode($message);
        exit;
    }

    /**
     * Delete an admin.
     */
    public function delete() {

        //must ajax and must post.
        if (!$this->input->is_ajax_request() || $this->input->method(true) != "POST") {
            exit('No direct script access allowed');
        }

        //load the model.
        $this->load->model('Product_model');

        //initial.
        $message['is_error'] = true;
        $message['redirect_to'] = "";
        $message['error_msg'] = "";

        //sanitize input (id is primary key).
        $id = sanitize_str_input($this->input->post('id'), "numeric");

        //check first.
        if (!empty($id) && is_numeric($id)) {
            //get data slider
            $data = $this->_dm->set_model($this->_table, $this->_table_aliases, $this->_pk)->get_all_data(array(
                "find_by_pk" => array($id),
                "row_array" => TRUE,
            ))['datas'];

            //no data is found with that ID.
            if (empty($data)) {
                $message['error_msg'] = 'Invalid ID.';

            } else {

                //begin transaction
                $this->db->trans_begin();

                $models = $this->Product_model->getAllSliderAfterNumber($data['ordering']);
                $ordering = $data['ordering'];
                foreach ($models as $model) {
                    $this->Product_model->update(array(
                        'ordering' =>  $ordering,
                    ),array('id' => $model['id']));
                    $ordering++;
                }

                if (isset($data['image_url']) && !empty($data['image_url'])) {
                    unlink (FCPATH.$data['image_url']);
                }

                if (isset($data['image_url_hot']) && !empty($data['image_url_hot'])) {
                    unlink (FCPATH.$data['image_url_hot']);
                }

                //delete the data (deactivate)
                $condition = array("id" => $id);
                $delete = $this->Product_model->delete($condition, array("is_permanently" => true));

                //end transaction.
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();

                    //failed.
                    $message['error_msg'] = 'database operation failed';
                } else {
                    $this->db->trans_commit();
                    //success.
                    $message['is_error'] = false;
                    $message['error_msg'] = '';

                    //growler.
                    $message['notif_title'] = "Done!";
                    $message['notif_message'] = "Slider has been delete.";
                    $message['redirect_to'] = "";
                }
            }

        } else {
            //id is not passed.
            $message['error_msg'] = 'Invalid ID.';
        }

        //encoding and returning.
        $this->output->set_content_type('application/json');
        echo json_encode($message);
        exit;
    }

    protected function upload_image ($file_name, $saving_path, $key, $data_image, $width, $height, $id, $preset2 = array()) {
        $message['is_error'] = true;
		$message['error_msg'] = "";
        $message['redirect_to'] = "";

        //after successfull image upload and cropping, this var will contain the path to the file.
        $final_upload_path = "";

        if ($data_image != "") {
            //validation success.
            //prepare upload config.
            $config = array(
                "allowed_types"         =>  FILE_TYPE_UPLOAD,
                "file_ext_tolower"      =>  true,
                "overwrite"             =>  false,
                "max_size"              =>  MAX_UPLOAD_IMAGE_SIZE_IN_KB,
                "upload_path"           =>  "upload/temp",
            );

            if (!empty($file_name)) {
                $config['filename_overwrite'] = $file_name;
            }

            //load the uploader library.
            $this->load->library('Uploader');

            //try to upload the image.
            $upload_result = $this->uploader->upload_files($key, false, $config);

            if ($upload_result['is_error']) {
                if (($id == "" && $upload_result['result'][0]['error_code'] == 0) || $upload_result['result'][0]['error_code'] != 0) {
                    //file upload error of something.
                    //show the error.
                    $message['error_msg'] = $upload_result['result'][0]['error_msg'];

                    //encoding and returning.
                    $this->output->set_content_type('application/json');
                    echo json_encode($message);
                    exit;
                }

            }

            //get first index because it's not multiple files.
            $uploaded = $upload_result['result'];

            //file upload success.
            if (!$upload_result['is_error']) {

                //creating config for image resizing.
                $config = array(
                    "image_targets"     =>  array(
                        "preset1"   =>  array(
                            "target_path"   =>  $saving_path,
                            "target_width"  =>  $width,
                            "target_height" =>  $height,
                            "crop_data"     =>  $data_image,
                        ),
                    )
                );

                if (!empty($preset2)) {
                    $config['image_targets']['preset2'] = $preset2;
                }

                $image_result = $this->uploader->crop_images($uploaded['uploaded_path'], true, $config);

                //if there is somekind of error, write it to log.
                if ($image_result['is_error'] ) {
                    foreach ($image_result['result'] as $key => $value) {
                        $message['error_msg'] .= $image_result['error_msg'];
                    }

                    //encoding and returning.
                    $this->output->set_content_type('application/json');
                    echo json_encode($message);
                    exit;
                } else {
                    //success cropping.

                    if (!empty($preset2)) {
                        $final_upload_path = array(
                            "/".$image_result['result'][0]['uploaded_path'],
                            "/".$image_result['result'][1]['uploaded_path'],
                        );
                    } else {
                        $final_upload_path = "/".$image_result['result'][0]['uploaded_path'];
                    }
                }
            } else if ($upload_result['is_error'] && $uploaded[0]['error_code'] == 0) {
                //if file upload error, but the error is because there is no new file.

            }
        } else {
            if ($id == "") {
                $message['error_msg'] = "Please upload image.";

                //encoding and returning.
                $this->output->set_content_type('application/json');
                echo json_encode($message);
                exit;
            }
        }
        return $final_upload_path;
    }
}

/* End of file Product_manager.php */
/* Location: ./application/modules/product/controllers/Product_manager.php */