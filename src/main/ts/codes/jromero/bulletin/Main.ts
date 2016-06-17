/// <reference path="../../../refs/jqueryui/jqueryui.d.ts" />
/// <reference path="../../../refs/jquery/jquery.d.ts" />

interface AJS {
  $: JQueryStatic
  toInit: any
  params: any
  messages: any
}

declare var AJS: AJS

type JElement = JQuery

AJS.toInit(function () {

  var bulletins = new Bulletins("Bulletin Board", 350)
  var projectPanels = new ProjectPanels()
  var projectPanelsController = new ProjectPanelsController(projectPanels);

  AJS.$("body").append(bulletins.element)

  AJS.$.get(`${AJS.params.baseURL}/rest/greenhopper/1.0/xboard/work/allData?rapidViewId=1`, function (data) {
    var projects = data.issuesData.projects
    if (projects.length > 0) {

      bulletins.contents.append(projectPanels.element)

      for (let project of projects) {
        AJS.$.get(`${AJS.params.baseURL}/rest/api/2/project/${project.id}`, function (data) {
          projectPanelsController.addProject(data.key)
        })
      }
    } else {
      AJS.messages.generic(bulletins.contents, {
        title: 'No projects discovered for this board.',
        body: '<p>As issues are added, we can determine what projects are associated to this board.</p>',
        closeable: false
      })
    }
  })
})