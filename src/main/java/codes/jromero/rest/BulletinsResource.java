package codes.jromero.rest;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import codes.jromero.ao.BulletinPdo;
import net.java.ao.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * A resource of message.
 */
@Component
@Path("/boards")
public class BulletinsResource {

    private final ActiveObjects activeObjects;

    private final JiraAuthenticationContext jiraAuthenticationContext;

    @Autowired
    public BulletinsResource(@ComponentImport ActiveObjects activeObjects) {
        this.activeObjects = activeObjects;
        System.out.println("ActiveObjects: " + activeObjects);

        jiraAuthenticationContext = ComponentAccessor.getJiraAuthenticationContext();
    }

    @GET
    @Path("{projectKey}/bulletins")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getBulletins(@PathParam("projectKey") String projectKey) {

        List<BulletinPdo> bulletinPdos = Arrays.asList(activeObjects.find(
                BulletinPdo.class,
                Query.select().where("PROJECT_KEY LIKE ?", projectKey)));

        int totalCount = bulletinPdos.size();

        List<BulletinModel> bulletins = new ArrayList<BulletinModel>();
        for (BulletinPdo bulletinPdo : bulletinPdos) {
            bulletins.add(new BulletinModel(
                    bulletinPdo.getID(),
                    bulletinPdo.getTitle(),
                    bulletinPdo.getBody(),
                    bulletinPdo.getCreatedBy(),
                    bulletinPdo.getCreatedAt(),
                    bulletinPdo.getUpdatedAt()));
        }

        return Response.ok(new BulletinsModel(totalCount, bulletins)).build();
    }

    @POST
    @Path("{projectKey}/bulletins")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response postBulletin(@PathParam("projectKey") String projectKey, BulletinModel bulletin) {

        BulletinPdo bulletinPdo = activeObjects.create(BulletinPdo.class);

        bulletinPdo.setProjectKey(projectKey);
        bulletinPdo.setTitle(bulletin.getTitle());
        bulletinPdo.setBody(bulletin.getBody());
        bulletinPdo.setCreatedBy(jiraAuthenticationContext.getUser().getKey());
        bulletinPdo.setCreatedAt(System.currentTimeMillis());
        bulletinPdo.setUpdatedAt(System.currentTimeMillis());
        bulletinPdo.save();

        BulletinModel bulletinModel = new BulletinModel(
                bulletinPdo.getID(),
                bulletinPdo.getTitle(),
                bulletinPdo.getBody(),
                bulletinPdo.getCreatedBy(),
                bulletinPdo.getCreatedAt(),
                bulletinPdo.getUpdatedAt());

        return Response.ok(bulletinModel).build();
    }

    @DELETE
    @Path("{projectKey}/bulletins/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response deleteBulletin(
            @PathParam("projectKey") String projectKey,
            @PathParam("id") int id) {

        BulletinPdo[] bulletinPdos = activeObjects.find(
                BulletinPdo.class,
                Query.select().where("PROJECT_KEY = ? AND ID = ?", projectKey, id));

        if (bulletinPdos.length >= 1) {
            activeObjects.delete(bulletinPdos[0]);
        }

        return Response.ok(new MessageModel("OK")).build();
    }
}