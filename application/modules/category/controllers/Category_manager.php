<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category_manager extends MX_Controller {

	private $_title         = "Product Category";
    private $_title_page    = '<i class="fa-fw fa fa-cubes"></i> Product Category';
    private $_breadcrumb    = "<li><a href='".MANAGER_HOME."'>Home</a></li>";
    private $_active_page   = "product-category";
    private $_back          = "/qcell/manager/category/list_category";
    private $_js_path       = "assets/js/pages/product/category/";
    private $_view_folder   = "category/";

    private $_table         = "tbl_category_product";
    private $_table_aliases = "tpc";
    private $_pk            = "tpc.CategoryId";

    protected $_dm;

    public function __construct() {
    	parent::__construct();

    	//load and prepare Dynamic_model
        $this->load->model('Dynamic_model');
        $this->_dm = new Dynamic_model();
    }

	/**
    * List Product Category
    */
    public function list_category() {
        //set header attribute.
        $header = array(
            "title"         => $this->_title,
            "title_page"    => $this->_title_page . '<span>> List Product Category </span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb . '<li>Product Category</li>',
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
            "title_page"    => $this->_title_page . '<span>> Create Product Category</span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb . '<li>Create Product Category</li>',
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

        $params = array("row_array" => true,"conditions" => array("CategoryId" => $id));
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
        $limit = sanitize_str_input($this->input->get("length"), "numeric");
        $start = sanitize_str_input($this->input->get("start"), "numeric");
        $search = sanitize_str_input($this->input->get("search")['value']);
        $filter   = $this->input->get("filter");

        $select = array('CategoryId','CategoryName','CategoryDescription');

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
            'select' => $select,
            'order_by' => array($column_sort => $sort_dir),
            'limit' => $limit,
            'start' => $start,
            'conditions' => $conditions,
            'filter' => $data_filters,
            "count_all_first" => true,
            'debug' => false
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
        $id                   = sanitize_str_input($this->input->post('id'));
        $name                 = sanitize_str_input($this->input->post('name'));
        $description          = $this->input->post('description');
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

            //validation success, prepare array to DB.
            $arrayToDB = array(
                'CategoryName '         => $name,
                'CategoryDescription'   => $description,
            );

            //insert or update?
            if ($id == "") {
            	//created date
                $arrayToDB['CategoryCreatedDate'] = date('Y-m-d H:i:s');
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
                    $message['redirect_to'] = "/qcell/manager/category/list_category";
                }
            } else {
                //condition for update.
                $condition = array("CategoryId" => $id);
                //update date time 
                $arrayToDB['CategoryUpdatedDate'] = date('Y-m-d H:i:s');

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
                    $message['redirect_to'] = "/qcell/manager/category/list_category";
                }
            }
        }
        //encoding and returning.
        $this->output->set_content_type('application/json');
        echo json_encode($message);
        exit;
    }
}

/* End of file Category_manager.php */
/* Location: ./application/modules/category/controllers/Category_manager.php */