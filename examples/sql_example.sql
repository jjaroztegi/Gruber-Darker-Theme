SELECT * FROM weather;

SELECT city, temp_lo, temp_hi, prcp, date
FROM weather;

SELECT city, (temp_hi + temp_lo) / 2 AS temp_avg, date
FROM weather;

SELECT *
FROM weather
WHERE city = 'San Francisco' AND prcp > 0.0;

SELECT *
FROM weather
ORDER BY city;

SELECT DISTINCT city
FROM weather
ORDER BY city;

SELECT city, temp_lo, temp_hi
FROM weather
WHERE temp_lo < 45;
