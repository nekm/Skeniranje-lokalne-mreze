-- node.t0_ip_mac definition

CREATE TABLE `t0_ip_mac` (
  `mac` varchar(20) NOT NULL,
  `ip` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- node.t0_ip_name definition

CREATE TABLE `t0_ip_name` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mac_address` varchar(20) NOT NULL,
  `name` varchar(40) NOT NULL,
  `ip` varchar(40) NOT NULL,
  `relevant` int(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
