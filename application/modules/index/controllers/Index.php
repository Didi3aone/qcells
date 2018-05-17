<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Index extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

	public function index()
	{
		$this->load->view(VIEW_WEB_FRONTEND_HEADER);
		$this->load->view(VIEW_WEB_MENU);
		$this->load->view(VIEW_WEB_FRONTEND_FOOTER);
	}

}

/* End of file Index.php */
/* Location: ./application/modules/index/controllers/Index.php */