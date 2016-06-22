package codes.jromero.rest.boards;

import codes.jromero.rest.dto.BulletinDto;
import codes.jromero.rest.dto.BulletinsDto;
import codes.jromero.rest.dto.MessageDto;
import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import codes.jromero.ao.BulletinPdo;
import net.java.ao.Query;
import org.pegdown.PegDownProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@Path("/boards")
public class BoardsResource {

    private final ActiveObjects activeObjects;
    private final JiraAuthenticationContext jiraAuthenticationContext;

    @Autowired
    public BoardsResource(@ComponentImport ActiveObjects activeObjects) {
        this.activeObjects = activeObjects;
        System.out.println("ActiveObjects: " + activeObjects);

        jiraAuthenticationContext = ComponentAccessor.getJiraAuthenticationContext();
    }

    @GET
    @Path("{projectKey}/bulletins")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getBulletins(@PathParam("projectKey") String projectKey) {

        PegDownProcessor processor = new PegDownProcessor();
        List<BulletinPdo> bulletinPdos = Arrays.asList(activeObjects.find(
                BulletinPdo.class,
                Query.select().where("PROJECT_KEY LIKE ?", projectKey)));

        int totalCount = bulletinPdos.size();

        List<BulletinDto> bulletins = new ArrayList<BulletinDto>();
        for (BulletinPdo bulletinPdo : bulletinPdos) {
            bulletins.add(new BulletinDto(
                    bulletinPdo.getID(),
                    bulletinPdo.getBody(),
                    processor.markdownToHtml(bulletinPdo.getBody()),
                    bulletinPdo.getCreatedBy(),
                    bulletinPdo.getCreatedAt(),
                    bulletinPdo.getUpdatedAt()));
        }

        return Response.ok(new BulletinsDto(totalCount, bulletins)).build();
    }

    @POST
    @Path("{projectKey}/bulletins")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response postBulletin(@PathParam("projectKey") String projectKey, BulletinDto bulletin) {

        PegDownProcessor processor = new PegDownProcessor();
        BulletinPdo bulletinPdo = activeObjects.create(BulletinPdo.class);

        bulletinPdo.setProjectKey(projectKey);
        bulletinPdo.setBody(bulletin.getBody());
        bulletinPdo.setCreatedBy(jiraAuthenticationContext.getUser().getKey());
        bulletinPdo.setCreatedAt(System.currentTimeMillis());
        bulletinPdo.setUpdatedAt(System.currentTimeMillis());
        bulletinPdo.save();

        BulletinDto bulletinDto = new BulletinDto(
                bulletinPdo.getID(),
                bulletinPdo.getBody(),
                processor.markdownToHtml(bulletinPdo.getBody()),
                bulletinPdo.getCreatedBy(),
                bulletinPdo.getCreatedAt(),
                bulletinPdo.getUpdatedAt());

        return Response.ok(bulletinDto).build();
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

        return Response.ok(new MessageDto("OK")).build();
    }
}