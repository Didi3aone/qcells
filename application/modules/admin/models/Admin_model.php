<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_model extends CI_Model {

	protected $_table = 'tbl_user';
    protected $_table_alias = 'tu';
    protected $_pk_field = 'UserId';

	public function __construct() {
		parent::__construct();
	}

	public function get_all_data($params = array())
    {
        //default values.
        (isset($params["select"])) ? $select = $params["select"] : $select = "*";
        (isset($params["status"])) ? $status = $params["status"] : $status = STATUS_ALL;
        (isset($params["order_by"]) && $params["order_by"] != null) ? $orderBy = $params["order_by"] : $orderBy = array($this->_pk_field => "asc");
        (isset($params["find_by_pk"])) ? $findByPK = $params["find_by_pk"]: $findByPK = array();
        (isset($params["limit"])) ? $limit = $params["limit"] : $limit = 0;
        (isset($params["start"])) ? $start = $params["start"] : $start = 0;
        (isset($params["conditions"])) ? $conditions = $params["conditions"] : $conditions = "";
        (isset($params["conditions_or"])) ? $conditions_or = $params["conditions_or"] : $conditions_or = "";
        (isset($params["filter"])) ? $filter = $params["filter"] : $filter = array();
        (isset($params["filter_or"])) ? $filter_or = $params["filter_or"] : $filter_or = array();
        (isset($params["row_array"])) ? $row_array = $params["row_array"] : $row_array = false;
        (isset($params["count_all_first"])) ? $count_all_first = $params["count_all_first"] : $count_all_first = false;
        (isset($params["joined"])) ? $joined = $params["joined"] : $joined = null;
        (isset($params["left_joined"])) ? $left_joined = $params["left_joined"] : $left_joined = null;
        (isset($params["from"])) ? $from = $params["from"] : $from = $this->_table." ".$this->_table_alias;
        (isset($params["group_by"])) ? $group_by = $params["group_by"] : $group_by = null;
        (isset($params["debug"])) ? $debug = $params["debug"] : $debug = false;
        (isset($params["distinct"])) ? $distinct = $params["distinct"] : $distinct = false;

        $this->db->select($select);

        //status == -1 will show all.
        if ($status != -1) {
            $this->db->where($this->_table_alias.".status", $status);
        }

        //for search for PK "id" as array.
        if (count($findByPK) > 0) {
            $this->db->where_in($this->_pk_field, $findByPK);
        }

        if ($distinct !== false) {
            $this->db->distinct();
        }

        //for where conditions.
        if (!empty($conditions)) {
            $this->db->where($conditions);
        }

        if (!empty($conditions_or)) {
            $this->db->group_start();
            $this->db->or_where($conditions_or);
            $this->db->group_end();
        }

        //for filters.
        if (is_array($filter) && count($filter) > 0) {
            $this->db->group_start();
            $keys = array_keys($filter);
            for ($i = 0; $i < count($keys); $i++) {
                $column = $keys[$i];
                $value = $filter[$keys[$i]];
                $this->db->like($column, $value);
            }
            $this->db->group_end();
        }
        //or filters.
        if (is_array($filter_or) && count($filter_or) > 0) {
            $this->db->group_start();
            $keys = array_keys($filter_or);
            for ($i = 0; $i < count($keys); $i++) {
                $column = $keys[$i];
                $value = $filter_or[$keys[$i]];
                if ($i == 0) {
                    $this->db->like($column, $value);
                } else {
                    $this->db->or_like($column, $value);
                }
            }
            $this->db->group_end();
        }

        //for ordering.
        foreach ($orderBy as $column => $order) {
            $this->db->order_by($column, $order);
        }

        //for join table.
        if ($joined != null) {
            foreach ($joined as $table_name => $connector) {
                $this->db->join($table_name, key($connector)." = ".$connector[key($connector)]);
            }
        }

        //for left joined table.
        if ($left_joined != null) {
            foreach ($left_joined as $table_name => $connector) {
                $this->db->join($table_name, key($connector)." = ".$connector[key($connector)], "left");
            }
        }

        //for group by
        if ($group_by != null) {
            $this->db->group_by($group_by);
        }

        //before adding limit and start, count all first.
        if ($count_all_first) {
            $result['total'] = $this->db->count_all_results($from, false);
        } else {
            $result['total'] = 0;
            $this->db->from($from);
        }

        //limit and start.
        $this->db->limit($limit, $start);

        //debug.
        if ($debug) {
            pq($this->db);
            exit;
        }

        //decide if the result is a single row or array of rows.
        if ($row_array === true) {
            $result['datas'] = $this->_get_row();
        } else {
            $result['datas'] = $this->_get_array();
        }

        //return it.
        return $result;
    }

    /**
     * this function is for private use only, to get query result as a single row only.
     */
    protected function _get_row()
    {
        $result = $this->db->get()->row_array();

        return $result;
    }

    /**
     * this function is for private use only, to get query result as array.
     */
    protected function _get_array()
    {
        $result = $this->db->get()->result_array();

        return $result;
    }

    /**
     * function insert.
     * @param $is_batch if you want to insert as batches.
     */
    public function insert($datas)
    {
        $this->db->insert($this->_table, $datas);
        return $this->db->insert_id();
    }

    /**
     * function update
     */
    public function update($datas, $condition)
    {
        return $this->db->update($this->_table, $datas, $condition);
    }

    /**
     * function delete
     */
    public function delete($condition, $extra_param = array())
    {
        return $this->db->delete($this->_table, $condition);
    }

    /**
     * check username and password (for login).
     */
	public function check_login($username, $password) {

		//get data by username.
        $this->db->where("UserName" , $username);
        $this->db->where('UserPassword', $password);

		$user = $this->db->get($this->_table)->row_array();

        return $user;
	}

    //generate a unique code and save the code to user's "unique_code".
	private function _generate_forgot_code($id) {

        //create a unique code, and make sure
        //that there is no same unique code in the table.
        do {
            $generated_link = uniqid();
        } while ($this->checkCode($generated_link));

        //insert to user's "unique_code".
        $this->update(array(
            "unique_code" => $generated_link,
            "end_forgotpass_time" => strtotime("+1 day"),
        ),array(
            "id" => $id,
        ));

        return $generated_link;
    }


    //find if the generated code is exists in the table or not.
	public function checkCode($link) {
        $this->db->where("unique_code", $link);
        return $this->db->get($this->_table)->row_array();
    }


	//method to generate an url with a unique code.
	public function send_forgot_pass($datas) {

        //create unique code.
		$code = $this->_generate_forgot_code($datas['id']);

        //encode the unique code.
        $link = base_url()."/manager/reset-password/".urlencode(base64_encode($code));

        //return as valid URL link.
        return $link;
	}


	//function to reset user's password to something generated.
	public function reset_password($datas) {

        //generate a new pass.
        $new_pass = substr(uniqid(),0,10);

		//change password and null the unique_code.
		$this->update(array(
            "password" => $new_pass,
            "unique_code" => null,
            "end_forgotpass_time" => null,
        ),array(
            "id" => $datas['id'],
        ));

		return $new_pass;
    }
}

/* End of file Admin_model.php */
/* Location: ./application/modules/admin/models/Admin_model.php */