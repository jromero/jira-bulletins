AJS.toInit(function(){
    var panelExpandedWidth = 350;

    var html = ' \
    <div id="bulletins-container"> \
      <a id="bulletins-tab-label" class="aui-button aui-button-primary aui-style">Bulletin&nbsp;Boards</a> \
      <div class="aui-page-panel"> \
        <div class="aui-page-panel-inner"> \
            <section id="bulletins-content" class="aui-page-panel-content" style="display: none"> \
                <h2>Bulletin Boards</h2> \
                <div id="bulletins-tabs" class="aui-tabs horizontal-tabs"> \
                    <ul id="bulletins-tabs-menu" class="tabs-menu"></ul> \
                </div> \
            </section> \
        </div> \
      </div> \
    </div> \
    ';
    AJS.$("body").append(html);

    AJS.$("#bulletins-tab-label").draggable({ axis: "y", cursor: "move" });

    AJS.$("#bulletins-tab-label").click(function() {
        var container = AJS.$("#bulletins-container");
        var content = AJS.$("#bulletins-content");

        if (container.width() == 0) {
            container.width(panelExpandedWidth);
            content.show();
        } else {
            container.width(0);
            content.hide();
        }
    })

    AJS.$.get(AJS.params.baseURL + "/rest/greenhopper/1.0/xboard/work/allData?rapidViewId=1", function(data) {
        var projects = data.issuesData.projects
        if (projects.length > 0) {
            for (var i = 0; i < projects.length; i++) {
                AJS.$.get(AJS.params.baseURL + "/rest/api/2/project/" + projects[i].id, function(data) {
                    AJS.$('#bulletins-tabs-menu').append('<li class="menu-item active-tab"><a>' + data.key + '</a></li>');
                    AJS.$('#bulletins-tabs').append(
                        '<div class="tabs-pane active-pane" id="bulletins-tab-pane-' + data.key + '"> \
                         <a class="aui-button aui-button-primary aui-style">Add</a> \
                         </div>'
                    );
                });
            }
        } else {
            AJS.$("#bulletins-tabs").hide();
            AJS.messages.generic("#bulletins-content", {
               title: 'No projects discovered for this board.',
               body: '<p>As issues are added, we can determine what projects are associated to this board.</p>',
               closeable: false
            });
        }
    })
});