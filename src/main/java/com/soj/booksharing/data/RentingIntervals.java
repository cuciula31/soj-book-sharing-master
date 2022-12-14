package com.soj.booksharing.data;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public record RentingIntervals(Date startDate, Date endDate) {


    public static RentingIntervals getIntervalsForSpecificPeriod(int period) {

        return switch (period) {
            case 1 -> new RentingIntervals(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()),
                    Date.from(LocalDate.now().plusWeeks(1).atStartOfDay(ZoneId.systemDefault()).toInstant()));
            case 2 -> new RentingIntervals(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()),
                    Date.from(LocalDate.now().plusWeeks(2).atStartOfDay(ZoneId.systemDefault()).toInstant()));
            case 3 -> new RentingIntervals(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()),
                    Date.from(LocalDate.now().plusWeeks(3).atStartOfDay(ZoneId.systemDefault()).toInstant()));
            case 4 -> new RentingIntervals(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()),
                    Date.from(LocalDate.now().plusMonths(1).atStartOfDay(ZoneId.systemDefault()).toInstant()));

            default -> throw new IllegalStateException("Unexpected value: " + period);
        };
    }
}
