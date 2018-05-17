<?php
    $id         = isset($item["CategoryId"]) ? $item["CategoryId"] : "";
    $title      = isset($item["CategoryName"]) ? $item["CategoryName"] : "";
    $description    = isset($item["CategoryDescription"]) ? $item["CategoryDescription"] : "";

    $btn_msg = ($id == 0) ? "Create" : " Update";
    $title_msg = ($id == 0) ? "Create" : " Update";
    $data_edit = ($id == 0) ? 0 : 1;
?>
<!-- MAIN CONTENT -->
<div id="content">
    <div class="row">
        <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7">
            <h1 class="page-title txt-color-blueDark"><?= $title_page ?></h1>
        </div>
        <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4 col-lg-offset-1 text-right">
            <h1>
                <button class="btn btn-warning back-button" onclick="<?= (isset($back) ? "go('".$back."');" : "window.history.back();") ?>" title="Back" rel="tooltip" data-placement="left" data-original-title="Batal">
                    <i class="fa fa-arrow-circle-left fa-lg"></i>
                </button>
                <button class="btn btn-primary submit-form" data-form-target="create-form" title="<?= $btn_msg ?>" rel="tooltip" data-placement="top" >
                    <i class="fa fa-floppy-o fa-lg"></i>
                </button>
            </h1>
        </div>
    </div>

    <!-- widget grid -->
    <section id="widget-grid" class="">

        <div class="row">
            <!-- NEW WIDGET ROW START -->
            <article class="col-sm-12 col-md-12 col-lg-12">

                <!-- Widget ID (each widget will need unique ID)-->
                <div class="jarviswidget" id="wid-id-0"
                data-widget-editbutton="false"
                data-widget-deletebutton="false">
                    <header>
                        <span class="widget-icon"> <i class="fa fa-pencil-square-o"></i> </span>
                        <h2><?= $title_msg ?> Product Category</h2>

                    </header>

                    <!-- widget div-->
                    <div>

                        <form class="smart-form" id="create-form" action="<?= site_url(); ?>manager/category/process_form" method="post" enctype="multipart/form-data">
                                <?php if($id != 0): ?>
                                    <input type="hidden" name="id" value="<?= $id ?>" />
                                <?php endif; ?>
                                <fieldset>
                                    <section>
                                        <label class="label">Name <sup class="color-red">*</sup></label>
                                        <label class="input">
                                                <input name="name" id="name" type="text"  class="form-control" placeholder="Name" value="<?= $title; ?>" />
                                        </label>
                                    </section>

                                    <section>
                                        <label class="label">Description</label>
                                        <label class="textarea">
                                            <textarea name="description" type="text"  class="form-control tinymce" rows="10"/><?= strip_tags($description); ?></textarea>
                                        </label>
                                    </section>
                                </fieldset>
                            </form>

                        </div>
                        <!-- end widget content -->
                    </div>
                <!-- end widget div -->
                </article>
        </div>
    </section> <!-- end widget grid -->
</div> <!-- END MAIN CONTENT -->
