package com.romanov.storage.repos;

import history.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface HistoryRepo extends JpaRepository<Record, Date> {
}
