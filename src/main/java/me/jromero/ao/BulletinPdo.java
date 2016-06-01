package me.jromero.ao;

import net.java.ao.Entity;
import net.java.ao.Preload;

public interface BulletinPdo extends Entity {

    String getProjectKey();

    void setProjectKey(String projectKey);

    String getTitle();

    void setTitle(String title);

    String getBody();

    void setBody(String body);

    String getCreatedBy();

    void setCreatedBy(String createdBy);

    long getCreatedAt();

    void setCreatedAt(long createdAtMs);

    long getUpdatedAt();

    void setUpdatedAt(long updatedAtMs);
}
