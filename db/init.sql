

-- Struktur table users
CREATE TABLE `users` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` boolean NOT NULL DEFAULT false,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`name`,`email`, `password`, `is_admin`) VALUES 
('John Doe', 'johndoe@example.com', 'password123', false),
('Jane Smith', 'janesmith@example.com', 'password456', false),
('Admin User', 'admin@example.com', 'adminpassword', true);

-- Struktur table vehicle_brands
CREATE TABLE `vehicle_brands` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- dummy data vehicle_brands
INSERT INTO `vehicle_brands` (`name`, `country`)
VALUES ('Toyota', 'Japan'),('Ford', 'United States'),('BMW', 'Germany');

-- Struktur table vehicle_types
CREATE TABLE `vehicle_types` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- dummy data vehicle_types
INSERT INTO `vehicle_types` (`name`, `brand_id`)
VALUES
  ('Sedan', 1),
  ('SUV', 1),
  ('Truck', 2);

-- Struktur table vehicle_models    
CREATE TABLE `vehicle_models` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- dummy data vehicle_models
INSERT INTO `vehicle_models` (`name`, `type_id`)
VALUES
  ('Camry', 1),
  ('RAV4', 2),
  ('F-150', 3);

-- Struktur table pricelist
CREATE TABLE `pricelist` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `year_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `currency` varchar(255) NOT NULL DEFAULT 'IDR',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- dummy data pricelist
INSERT INTO `pricelist` (`year_id`, `model_id`, `price`, `currency`)
VALUES
  (1, 1, 25000.00, 'USD'),
  (2, 2, 30000.00, 'USD'),
  (3, 3, 40000.00, 'USD');
-- Struktur table vehicle_years
CREATE TABLE `vehicle_years` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `year` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- dummy data vehicle_years
INSERT INTO `vehicle_years` (`year`)
VALUES
  ('2021'),
  ('2022'),
  ('2023');
