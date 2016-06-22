package codes.jromero.rest.markdown;

import codes.jromero.rest.dto.HtmlDto;
import codes.jromero.rest.dto.MarkdownDto;
import org.pegdown.PegDownProcessor;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Component
@Path("/markdown")
public class MarkdownService {

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response postMarkdown(MarkdownDto markdownDto) {
        PegDownProcessor processor = new PegDownProcessor();
        String html = processor.markdownToHtml(markdownDto.getMarkdown());
        return Response.ok(new HtmlDto(html)).build();
    }
}
