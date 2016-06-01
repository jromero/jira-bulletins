AJS.$.get("/jira/rest/auth/1/session", function (data) {
    var userName = data.name;
    alert("hello " + userName);
//
//    // check groups
//    AJS.$.get("/jira/rest/api/2.0.alpha1/user", {username: userName, expand: "groups"}, function (data) {
//        var groups = data.groups;
//        var groupItems = jQuery.map(groups.items, function (val, j) {return val.name});
//
//        if (jQuery.inArray("jira-administrators", groups.items)) {
//            ...
//        }
//    });
});