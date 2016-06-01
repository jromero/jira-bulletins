//AJS.$.get("/jira/rest/bulletin/1/boards/TP1/bulletins.json", function (data) {
//
//});

AJS.toInit(function(){
    var html = ' \
    <div id="bulletins-container"> \
      <a id="bulletins-tab-label" class="aui-button aui-button-primary aui-style">Bulletin&nbsp;Boards</a> \
      <div class="aui-page-panel"> \
        <div class="aui-page-panel-inner"> \
            <section class="aui-page-panel-content"> \
                <h2>Bulletin Boards</h2> \
                <div class="aui-tabs horizontal-tabs"> \
                    <ul class="tabs-menu"> \
                        <li class="menu-item active-tab"> \
                            <a href="#tabs-example-first">Tab 1</a> \
                        </li> \
                        <li class="menu-item"> \
                            <a href="#tabs-example-second">Tab 2</a> \
                        </li> \
                    </ul> \
                    <div class="tabs-pane active-pane" id="tabs-example-first"> \
                        <h2>This is tab 1</h2> \
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> \
                    </div> \
                    <div class="tabs-pane" id="tabs-example-second"> \
                        <h2>This is tab 2</h2> \
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> \
                    </div> \
                </div> \
            </section> \
        </div> \
      </div> \
    </div> \
    ';
    AJS.$("body").append(html);

    AJS.$("#bulletins-tab-label").draggable({ axis: "y", cursor: "move" });
});