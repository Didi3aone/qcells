<?php
    $id                     = isset($item["ProductId"]) ? $item["ProductId"] : "";
    $product_category_id    = isset($item['ProductCategoryId']) ? $item['ProductCategoryId'] : "";
    $code                   = isset($item['ProductCode']) ? $item['ProductCode'] : 0;
    $name                   = isset($item["ProductName"]) ? $item["ProductName"] : "";
    $price                  = isset($item["ProductPrice"]) ? $item["ProductPrice"] : 0;
    $pricefix               = isset($item["ProductPriceFix"]) ? $item["ProductPriceFix"] : 0;
    $discount               = isset($item["ProductDiscount"]) ? $item["ProductDiscount"] : "0%";
    $description            = isset($item["ProductDescription"]) ? $item["ProductDescription"] : "";
    $image_url              = isset($item["ProductPhoto"]) ? $item["ProductPhoto"] : "";
    $created_date           = isset($item['ProductCreatedDate']) ? $item['ProductCreatedDate'] : "";
    $updated_date           = isset($item['ProductUpdatedDate']) ? $item['ProductUpdatedDate'] : "";
    $btn_msg                = ($id == 0) ? "Create" : " Update";
    $title_msg              = ($id == 0) ? "Create" : " Update";
    $data_edit              = ($id == 0) ? 0 : 1;
    /*
        $('input').val('a');
        $('textarea').text('a');
    */
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
                <button class="btn btn-primary submit-form" data-form-target="create-form" title="Simpan" rel="tooltip" data-placement="top" >
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
                        <h2><?= $title_msg ?> Product</h2>

                    </header>

                    <!-- widget div-->
                    <div>

                        <form class="smart-form" id="create-form" action="<?= site_url(); ?>manager/product/process_form" method="post" enctype="multipart/form-data">
                                <?php if($id != 0): ?>
                                    <input type="hidden" name="id" value="<?= $id ?>" />
                                <?php endif; ?>
                                <fieldset>
                                    <section>
                                        <label class="label"> Product Category <sup class="color-red">*</sup></label>
                                        <label class="select">
                                            <?php echo select_product_category('product_category_id', $product_category_id , 'id="product_category_id" class="form-control"'); ?>
                                            <i></i>
                                        </label>
                                    </section>

                                    <section style="display: none;">
                                        <label class="label">Operator<sup class="color-red">*</sup></label>
                                        <label class="input">
                                                <input name="name" id="name" type="text"  class="form-control" placeholder="Name" value="<?= $name; ?>" />
                                        </label>
                                    </section>

                                    <section>
                                        <label class="label">Product Name <sup class="color-red">*</sup></label>
                                        <label class="input">
                                                <input name="name" id="name" type="text"  class="form-control" placeholder="Name" value="<?= $name; ?>" />
                                        </label>
                                    </section>

                                    <section>
                                        <label class="label">Product Code</label>
                                        <label class="input">
                                                <input name="code" type="text"  class="form-control" placeholder="Product Code" value="<?= $code; ?>" />
                                        </label>
                                        <div class="note">Kode produk harus berisi unik angka dan huruf</div>
                                    </section>

                                    <section>
                                        <label class="label">Product Price</label>
                                        <label class="input">
                                                <input name="price" type="text"  class="form-control" placeholder="Product Code" value="<?= $price; ?>" />
                                        </label>
                                    </section>

                                    <section>
                                        <label class="label">Product Discount</label>
                                        <label class="input">
                                                <input name="discount" type="text" id="discount_is_not_empty"  class="form-control" placeholder="Product Code" value="<?= $discount; ?>" />
                                        </label>
                                    </section>

                                    <section style="display: none;" class="show_hide">
                                        <label class="label">Product Price FIX</label>
                                        <label class="input">
                                            <input name="pricefix" type="text" class="form-control" placeholder="Product Price Fix" value="<?= $pricefix; ?>" />
                                        </label>
                                    </section>

                                    <section>
                                        <label class="label">Image Small(325x400)<sup class="color-red">*</sup></label>
                                        <div class="input">
                                            <div class="add-image-preview" id="preview-image">
                                                <?php if($image_url): ?>
                                                <a href="<?= base_url($image_url) ?>" data-lightbox="roadtrip"><img src="<?= base_url($image_url) ?>" height="100px"/></a>
                                                <?php endif; ?>
                                            </div>
                                            <button type="button" class="btn btn-primary btn-sm" id="addimage" data-maxsize="<?= MAX_UPLOAD_IMAGE_SIZE ?>" data-maxwords="<?= WORDS_MAX_UPLOAD_IMAGE_SIZE ?>" data-edit="<?= $data_edit ?>"><?= ($image_url != "") ? "Change" : "Add" ?> Image</button>
                                        </div>
                                    </section>

                                    <section>
                                        <label class="label">Description</label>
                                        <label class="textarea">
                                            <textarea name="description" type="text"  class="form-control tinymce" placeholder="Description" ><?= $description; ?></textarea>
                                        </label>
                                    </section>
                                </fieldset>

                                <fieldset>
                                    <?php if ($created_date != ""): ?>
                                    <section>
                                        <label class="label">Created date </label>
                                        <label class="input"> 
                                            <?php echo $created_date; ?>
                                        </label>
                                    </section> 
                                    <?php endif; ?>
                                    
                                    <?php if ($updated_date != ""): ?>
                                    <section>
                                        <label class="label">Update date </label>
                                        <label class="input"> 
                                            <?php echo $updated_date; ?>
                                        </label>
                                    </section> 
                                    <?php endif; ?>
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
