<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Dashboard Controller.
 * For Dashboard admin
 */
class Dashboard_manager extends MX_Controller  {

    private $_title = "Dashboard";
    private $_title_page = '<i class="fa-fw fa fa-home"></i> Dashboard ';
    private $_active_page = "dashboard";
    private $_breadcrumb = "<li><a href='".MANAGER_HOME."'>Dashboard</a></li>";
    private $_back = "";
    private $_js = "";
    private $_view_folder = "dashboard/manager/";

    /**
	 * constructor.
	 */
    public function __construct() {
        parent::__construct();

        if($this->session->userdata("IS_LOGIN_ADMIN") == FALSE) {
            redirect('manager/login'); 
        }
    }

    public function index() {
        $header = array(
            "title"         => $this->_title,
            "title_page"    => $this->_title_page . '<span>> My Dashboard</span>',
            "active_page"   => $this->_active_page,
            "breadcrumb"    => $this->_breadcrumb,
        );

        //load the views.
        $this->load->view(MANAGER_HEADER,$header);
        $this->load->view($this->_view_folder . 'index');
        $this->load->view(MANAGER_FOOTER);
    }

}
