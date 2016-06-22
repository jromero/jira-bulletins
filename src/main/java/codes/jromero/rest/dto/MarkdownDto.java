package codes.jromero.rest.dto;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "markdown")
@XmlAccessorType(XmlAccessType.FIELD)
public class MarkdownDto {

    private String markdown;

    /**
     * WARNING: Should not be used manually
     */
    public MarkdownDto() {}

    public MarkdownDto(String markdown) {
        this.markdown = markdown;
    }

    public String getMarkdown() {
        return markdown;
    }
}
