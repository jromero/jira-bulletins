/// <reference path="../../../refs/atlassian/ajs/ajs.d.ts" />
/// <reference path="../../../refs/jqueryui/jqueryui.d.ts" />
/// <reference path="../../../refs/jquery/jquery.d.ts" />

type JElement = JQuery

AJS.toInit(function () {

  var bulletins = new Bulletins("Bulletin Board", 350)
  var projectPanels = new ProjectPanels()
  var projectPanelsController = new ProjectPanelsController(projectPanels);

  AJS.$("body").append(bulletins.element)

  AJS.$.get(`${AJS.params.baseURL}/rest/greenhopper/1.0/xboard/work/allData?rapidViewId=1`, function (data) {
    var projects: any[] = data.issuesData.projects
    if (projects.length > 0) {

      bulletins.contents.append(projectPanels.element)

      var promises = projects.map((project) => {
        return AJS.$.get(`${AJS.params.baseURL}/rest/api/2/project/${project.id}`)
      })

      AJS.$.when.apply($, promises).then(function () {
        var results: any[] = [].slice.call(arguments)
        
        var projects = results.map((data) => {
          return data[0].key
        }).sort()

        projects.forEach((projectKey, index) => {
          AJS.log(`adding project ${projectKey}`)
          projectPanelsController.addProject(projectKey)

          if (index == 0) {
            projectPanelsController.setActiveProject(projectKey)
          }
        })
      });
    } else {
      AJS.messages.generic(bulletins.contents, {
        title: 'No projects discovered for this board.',
        body: '<p>As issues are added, we can determine what projects are associated to this board.</p>',
        closeable: false
      })
    }
  })
})