/// <reference path="../../../.refs/atlassian/ajs/ajs.d.ts" />
/// <reference path="../../../.refs/jqueryui/jqueryui.d.ts" />
/// <reference path="../../../.refs/jquery/jquery.d.ts" />

type JElement = JQuery

AJS.toInit(function () {

  var url = window.location.href
  var matches = /\?(.*)rapidView=([0-9]+)/.exec(url)

  AJS.log(`URL: ${url}`)
  AJS.log(`Detecting rapidBoard: ${JSON.stringify(matches)}`)

  if (matches != null && matches.length == 3) {
    var boardId = matches[2]
    var bulletinsRepo = new BulletinsRepo()
    var bulletinBoard = new BulletinBoard("Bulletin Board", 350)
    var projectPanels = new ProjectPanels(bulletinsRepo)
    var projectPanelsController = new ProjectPanelsController(bulletinsRepo, projectPanels);

    AJS.$("body").append(bulletinBoard.element)

    AJS.log(`Inspecting rapidBoard: ${boardId}`)

    AJS.$.get(`${AJS.contextPath()}/rest/greenhopper/1.0/xboard/work/allData?rapidViewId=${boardId}`, function (data) {
      var projects: any[] = data.issuesData.projects
      if (projects.length > 0) {

        bulletinBoard.contents.append(projectPanels.element)

        var promises = projects.map((project) => {
          var url = `${AJS.params.baseURL}/rest/api/2/project/${project.id}`
          AJS.log(`Setting up promise for: ${url}`)
          return AJS.$.get(url)
        })

        AJS.log(`Promises: ${JSON.stringify(promises)}`)

        AJS.$.when.apply(AJS.$, promises).then(function () {
          var results: any[]
          if (promises.length > 1) {
            results = [].slice.call(arguments)
          } else {
            results = [[].slice.call(arguments)]
          }

          var projects = results.map((data) => {
            return data[0].key
          }).sort()

          projects.forEach((projectKey, index) => {
            AJS.log(`Adding project ${projectKey}`)
            projectPanelsController.addProject(projectKey)

            if (index == 0) {
              projectPanelsController.setActiveProject(projectKey)
            }
          })
        });
      } else {
        AJS.messages.generic(bulletinBoard.contents, {
          title: 'No projects discovered for this board.',
          body: '<p>As issues are added, we can determine what projects are associated to this board.</p>',
          closeable: false
        })
      }
    })
  } else {
    AJS.log("No rapid board detected!")
  }
})