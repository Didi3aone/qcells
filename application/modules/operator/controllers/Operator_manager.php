<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operator_manager extends CI_Controller {

	private $_title         = "Operator Pulsa";
    private $_title_page    = '<i class="fa-fw fa fa-users"></i> Operator Pulsa';
    private $_breadcrumb    = "<li><a href='".MANAGER_HOME."'>Home</a></li>";
    private $_active_page   = "product-category";
    private $_back          = "/qcell/manager/operator/list_operator";
    private $_js_path       = "assets/js/pages/operator/";
    private $_view_folder   = "operator/";

    private $_table         = "tbl_operator_pulsa";
    private $_table_aliases = "top";
    private $_pk            = "top.OperatorId";

    protected $_dm;

	public function __construct() {
		parent::__construct();
        //load and prepare Dynamic_model
        $this->load->model('Dynamic_model');
        $this->_dm = new Dynamic_model();
	}

	public function list_operator()
	{
		//set header attribute.
        $header = array(
            "title"         => $this->_title,
            "title_page"    => $this->_title_page . '<span>> Operator Pulsa </span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb . '<li>Operator Pulsa</li>',
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

	//////////////////////////////// Create //////////////////////////////////////
    /**
    * Create an Product Category
    */
    public function create () {
        $this->_breadcrumb .= '<li><a href="/manager/product/category">Product Category</a></li>';

        //prepare header title.
        $header = array(
            "title"         => $this->_title,
            "title_page"    => $this->_title_page . '<span>> Create Operator Pulsa</span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb . '<li>Create Operator Pulsa</li>',
            "back"          => $this->_back,
        );

        $footer = array(
            "script" => array(
                $this->_js_path . "create.js",
                "assets/js/plugins/tinymce/tinymce.min.js"
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
        $this->_breadcrumb .= '<li><a href="/qcell/manager/product/category">Product Category</a></li>';

        $data['item'] = null;

        //validate ID and check for data.
        if ( $id === null || !is_numeric($id) ) {
            show_404();
        }

        $params = array(
        	"row_array" => true,
        	"conditions" => array("CategoryId" => $id)
        );
        //get the data.
        $data['item'] = $this->_dm->set_model($this->_table, $this->_table_aliases, $this->_pk)->get_all_data($params)['datas'];

        //if no data found with that ID, throw error.
        if (empty($data['item'])) {
            show_404();
        }

        //prepare header title.
        $header = array(
            "title"         => $this->_title,
            "title_page"    => $this->_title_page . '<span>> Edit Product Category</span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb . '<li>Edit Product Category</li>',
            "back"          => $this->_back,
        );

        $footer = array(
            "script" => array(
                $this->_js_path . "create.js",
                "assets/js/plugins/tinymce/tinymce.min.js"
            )
        );

        //load the view.
        $this->load->view(MANAGER_HEADER, $header);
        $this->load->view($this->_view_folder . 'create', $data);
        $this->load->view(MANAGER_FOOTER, $footer);
    }

    //////////////////////////////// RULES //////////////////////////////////////
    /**
     * Set validation rule for admin create and edit
     */
    private function _set_rule_validation() {

        //prepping to set no delimiters.
        $this->form_validation->set_error_delimiters('', '');

        //validates.
        $this->form_validation->set_rules("name", "Name", "trim|required");
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
        $limit    = sanitize_str_input($this->input->get("length"), "numeric");
        $start    = sanitize_str_input($this->input->get("start"), "numeric");
        $search   = sanitize_str_input($this->input->get("search")['value']);
        $filter   = $this->input->get("filter");

        $select = array(
            $this->_table_aliases.'.OperatorId',
            $this->_table_aliases.'.OperatorName',
            'tcp.CardName',
            $this->_table_aliases.'.OperatorImage',
            $this->_table_aliases.'.OperatorDescription'
        );
        $joined = array(
            "tbl_card_type tcp" => array(
                $this->_table_aliases.".OperatorCardTypeId" => "tcp.CardId"
            )
        );

        $column_sort = $select[$sort_col];
        // var_dump($column_sort);exit();

        //initialize.
        $data_filters = array();
        $conditions = array();

        if (count ($filter) > 0) {
            foreach ($filter as $key => $value) {
                $value = sanitize_str_input($value);
                switch ($key) {
                    case 'id':
                        if ($value != "") {
                            $data_filters['lower(CategoryId)'] = $value;
                        }
                        break;

                    case 'name':
                        if ($value != "") {
                            $data_filters['lower(CategoryName)'] = $value;
                        }
                        break;

                    case 'description':
                        if ($value != "") {
                            $data_filters['lower(CategoryDescription)'] = $value;
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
            'joined'            => $joined,
            'order_by'          => array($column_sort => $sort_dir),
            'limit'             => $limit,
            'start'             => $start,
            'conditions'        => $conditions,
            'filter'            => $data_filters,
            "count_all_first"   => true,
            'debug'             => false
        ));
        // pr($datas);exit;

        //get total rows
        $total_rows = $datas['total'];

        $output = array(
            "data"              => $datas['datas'],
            "draw"              => intval($this->input->get("draw")),
            "recordsTotal"      => $total_rows,
            "recordsFiltered"   => $total_rows,
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
        $id                   = sanitize_str_input($this->input->post('id'));
        $name                 = sanitize_str_input($this->input->post('name'));
        $description          = $this->input->post('description');
        $data_image_large     = $this->input->post('data-image');
        $card_id              = $this->input->post('card_id');
        // pr($this->input->post());exit();

        //server side validation.
        $this->_set_rule_validation($id);

        //checking.
        if ($this->form_validation->run($this) == FALSE) {

            //validation failed.
            $message['error_msg'] = validation_errors();

        } else {
            //begin transaction.
            $this->db->trans_begin();

            if(isset($_FILES['image-url'])){
                $image_pro = $this->upload_image("qcellfile", "upload/product", "image-url", $data_image_large, 784, 460, $id);
            }

            //validation success, prepare array to DB.
            $arrayToDB = array(
                'OperatorName '         => $name,
                'OperatorDescription'   => $description,
                'OperatorCardTypeId '   => $card_id
            );

            if (!empty($image_pro)) {
                $arrayToDB['OperatorImage'] = $image_pro;
            }

            //insert or update?
            if ($id == "") {
            	//created date
                $arrayToDB['OperatorCreatedDate'] = date('Y-m-d H:i:s');
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
                    $message['notif_message'] = "New Category has been added.";

                    //on insert, not redirected.
                    $message['redirect_to'] = "/qcell/manager/operator/list_operator";
                }
            } else {
                //condition for update.
                $condition = array("OperatorId" => $id);
                //update date time 
                $arrayToDB['OperatorUpdatedDate'] = date('Y-m-d H:i:s');

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
                    $message['notif_message'] = "Category has been updated.";

                    //on update, redirect.
                    $message['redirect_to'] = "/qcell/manager/operator/list_operator";
                }
            }
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

/* End of file Operator_manager.php */
/* Location: ./application/modules/operator/controllers/Operator_manager.php */