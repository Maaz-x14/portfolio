package com.maaz.portfolio.controller;

import com.maaz.portfolio.model.IndexItem;
import com.maaz.portfolio.service.PineconeService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@SpringBootTest
public class AdminIndexControllerTest {

    @Test
    public void testAdminKeyRejects() {
        PineconeService pine = Mockito.mock(PineconeService.class);
        AdminIndexController c = new AdminIndexController(pine);
        ResponseEntity<?> r = c.index(null, List.of(new IndexItem()));
        Assertions.assertEquals(HttpStatus.FORBIDDEN, r.getStatusCode());
    }
}
