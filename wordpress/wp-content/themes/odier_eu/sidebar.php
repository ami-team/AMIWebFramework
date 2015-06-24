
        <div class="site-sidebar">

          <div class="site-sidebar-button"><i class="fa fa-plus-circle fa-2x"></i></div>

          <div class="site-sidebar-content">

            <hr />

            <div class="row">

              <div class="col-md-4">
                <?php if(is_active_sidebar('sidebar-1')) dynamic_sidebar_good('sidebar-1'); ?>
              </div>
              <div class="col-md-4">
                <?php if(is_active_sidebar('sidebar-2')) dynamic_sidebar_good('sidebar-2'); ?>
              </div>
              <div class="col-md-4">
                <?php if(is_active_sidebar('sidebar-3')) dynamic_sidebar_good('sidebar-3'); ?>
              </div>

            </div>

            <hr />

          </div>

        </div>
