CREATE DATABASE IF NOT EXISTS structured_cap;

USE structured_cap;

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `savedProperties` varchar(200) NOT NULL,
  `isadmin` bit(1) NOT NULL DEFAULT 1,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Table structure for table `properties`
--

CREATE TABLE IF NOT EXISTS `properties` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(10) NOT NULL,
  `phase` varchar(12) NOT NULL,
  `property_type` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `zip` int(5) NOT NULL,
  `latlng` varchar(30) NOT NULL,
  `county` varchar(20) NOT NULL,
  `year_built` int(4) NOT NULL,
  `sqft` varchar(50) NOT NULL,
  `lotsize` varchar(50) NOT NULL,
  `beds` int(3) NOT NULL,
  `baths` int(3) NOT NULL,
  `listdesc` varchar(1000) NOT NULL,
  `pool_spa` tinyint(1),
  `occupancy` varchar(15) NOT NULL,
  `lockbox_combo` int(10) NOT NULL,
  `alarm_code` int(10) NOT NULL,
  `asset_manager` varchar(10) NOT NULL,
  `purchase_close_date` date NOT NULL,
  `purchase_cost` varchar(20) NOT NULL,
  `entity_vesting` varchar(10) NOT NULL,
  `lender` varchar(25) NOT NULL,
  `rehab_estimate` varchar(10) NOT NULL,
  `arv` varchar(10) NOT NULL,
  `is_listed` tinyint(1),
  `listing_date` date NOT NULL,
  `list_price` varchar(20) NOT NULL,
  `escrow_price` varchar(20) NOT NULL,
  `sale_close_date` date NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


--
-- Table structure for table `property images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `image_id` int(10) NOT NULL AUTO_INCREMENT,
  `image_name` varchar(50) NOT NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (`image_id`),
  FOREIGN KEY (`pid`) REFERENCES properties(pid)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(10) NOT NULL AUTO_INCREMENT,
  `comment` varchar(5000) NOT NULL,
  `users_uid` int(11) NOT NULL,
  `properties_pid` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  FOREIGN KEY (`properties_pid`) REFERENCES properties(pid),
  FOREIGN KEY (`users_uid`) REFERENCES users(uid)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Table structure for table `rehabs`
--
CREATE TABLE IF NOT EXISTS `rehabs` (
  `rehab_id` int(10) NOT NULL AUTO_INCREMENT,
  `planned_start` date NOT NULL,
  `planned_finish` date NOT NULL,
  `actual_start` date NOT NULL,
  `actual_finish` date NOT NULL,
  `permits` varchar(3) NOT NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (rehab_id),
  FOREIGN KEY(`pid`) references properties(pid);
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Table structure for each rehab table
--
CREATE TABLE IF NOT EXISTS `electrical` (
  `electrical_id` int(10) NOT NULL AUTO_INCREMENT,
  `electrical_planned_start` date NOT NULL,
  `electrical_planned_finish` date NOT NULL,
  `electrical_actual_start` date NOT NULL,
  `electrical_actual_finish` date NOT NULL,
  `electrical_planned_cost` varchar(15) NOT NULL,
  `electrical_actual_cost` varchar(15) NOT NULL,
  `electrical_contractor` varchar(50) NOT NULL,
  `electrical_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`electrical_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `bath` (
  `bath_id` int(10) NOT NULL AUTO_INCREMENT,
  `bath_planned_start` date NOT NULL,
  `bath_planned_finish` date NOT NULL,
  `bath_actual_start` date NOT NULL,
  `bath_actual_finish` date NOT NULL,
  `bath_planned_cost` varchar(15) NOT NULL,
  `bath_actual_cost` varchar(15) NOT NULL,
  `bath_contractor` varchar(50) NOT NULL,
  `bath_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`bath_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `demo` (
  `demo_id` int(10) NOT NULL AUTO_INCREMENT,
  `demo_planned_start` date NOT NULL,
  `demo_planned_finish` date NOT NULL,
  `demo_actual_start` date NOT NULL,
  `demo_actual_finish` date NOT NULL,
  `demo_planned_cost` varchar(15) NOT NULL,
  `demo_actual_cost` varchar(15) NOT NULL,
  `demo_contractor` varchar(50) NOT NULL,
  `demo_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`demo_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `drywall` (
  `drywall_id` int(10) NOT NULL AUTO_INCREMENT,
  `drywall_planned_start` date NOT NULL,
  `drywall_planned_finish` date NOT NULL,
  `drywall_actual_start` date NOT NULL,
  `drywall_actual_finish` date NOT NULL,
  `drywall_planned_cost` varchar(15) NOT NULL,
  `drywall_actual_cost` varchar(15) NOT NULL,
  `drywall_contractor` varchar(50) NOT NULL,
  `drywall_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`drywall_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `ext_paint` (
  `ext_paint_id` int(10) NOT NULL AUTO_INCREMENT,
  `ext_paint_planned_start` date NOT NULL,
  `ext_paint_planned_finish` date NOT NULL,
  `ext_paint_actual_start` date NOT NULL,
  `ext_paint_actual_finish` date NOT NULL,
  `ext_paint_planned_cost` varchar(15) NOT NULL,
  `ext_paint_actual_cost` varchar(15) NOT NULL,
  `ext_paint_contractor` varchar(50) NOT NULL,
  `ext_paint_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`ext_paint_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `fixtures` (
  `fixtures_id` int(10) NOT NULL AUTO_INCREMENT,
  `fixtures_planned_start` date NOT NULL,
  `fixtures_planned_finish` date NOT NULL,
  `fixtures_actual_start` date NOT NULL,
  `fixtures_actual_finish` date NOT NULL,
  `fixtures_planned_cost` varchar(15) NOT NULL,
  `fixtures_actual_cost` varchar(15) NOT NULL,
  `fixtures_contractor` varchar(50) NOT NULL,
  `fixtures_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`fixtures_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `flooring` (
  `flooring_id` int(10) NOT NULL AUTO_INCREMENT,
  `flooring_planned_start` date NOT NULL,
  `flooring_planned_finish` date NOT NULL,
  `flooring_actual_start` date NOT NULL,
  `flooring_actual_finish` date NOT NULL,
  `flooring_planned_cost` varchar(15) NOT NULL,
  `flooring_actual_cost` varchar(15) NOT NULL,
  `flooring_contractor` varchar(50) NOT NULL,
  `flooring_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`flooring_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `framing` (
  `framing_id` int(10) NOT NULL AUTO_INCREMENT,
  `framing_planned_start` date NOT NULL,
  `framing_planned_finish` date NOT NULL,
  `framing_actual_start` date NOT NULL,
  `framing_actual_finish` date NOT NULL,
  `framing_planned_cost` varchar(15) NOT NULL,
  `framing_actual_cost` varchar(15) NOT NULL,
  `framing_contractor` varchar(50) NOT NULL,
  `framing_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`framing_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `garage_door` (
  `garage_door_id` int(10) NOT NULL AUTO_INCREMENT,
  `garage_door_planned_start` date NOT NULL,
  `garage_door_planned_finish` date NOT NULL,
  `garage_door_actual_start` date NOT NULL,
  `garage_door_actual_finish` date NOT NULL,
  `garage_door_planned_cost` varchar(15) NOT NULL,
  `garage_door_actual_cost` varchar(15) NOT NULL,
  `garage_door_contractor` varchar(50) NOT NULL,
  `garage_door_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`garage_door_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `hardscape` (
  `hardscape_id` int(10) NOT NULL AUTO_INCREMENT,
  `hardscape_planned_start` date NOT NULL,
  `hardscape_planned_finish` date NOT NULL,
  `hardscape_actual_start` date NOT NULL,
  `hardscape_actual_finish` date NOT NULL,
  `hardscape_planned_cost` varchar(15) NOT NULL,
  `hardscape_actual_cost` varchar(15) NOT NULL,
  `hardscape_contractor` varchar(50) NOT NULL,
  `hardscape_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`hardscape_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `hvac` (
  `hvac_id` int(10) NOT NULL AUTO_INCREMENT,
  `hvac_planned_start` date NOT NULL,
  `hvac_planned_finish` date NOT NULL,
  `hvac_actual_start` date NOT NULL,
  `hvac_actual_finish` date NOT NULL,
  `hvac_planned_cost` varchar(15) NOT NULL,
  `hvac_actual_cost` varchar(15) NOT NULL,
  `hvac_contractor` varchar(50) NOT NULL,
  `hvac_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`hvac_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `int_paint` (
  `int_paint_id` int(10) NOT NULL AUTO_INCREMENT,
  `int_paint_planned_start` date NOT NULL,
  `int_paint_planned_finish` date NOT NULL,
  `int_paint_actual_start` date NOT NULL,
  `int_paint_actual_finish` date NOT NULL,
  `int_paint_planned_cost` varchar(15) NOT NULL,
  `int_paint_actual_cost` varchar(15) NOT NULL,
  `int_paint_contractor` varchar(50) NOT NULL,
  `int_paint_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`int_paint_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `kitchen` (
  `kitchen_id` int(10) NOT NULL AUTO_INCREMENT,
  `kitchen_planned_start` date NOT NULL,
  `kitchen_planned_finish` date NOT NULL,
  `kitchen_actual_start` date NOT NULL,
  `kitchen_actual_finish` date NOT NULL,
  `kitchen_planned_cost` varchar(15) NOT NULL,
  `kitchen_actual_cost` varchar(15) NOT NULL,
  `kitchen_contractor` varchar(50) NOT NULL,
  `kitchen_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`kitchen_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `landscaping` (
  `landscaping_id` int(10) NOT NULL AUTO_INCREMENT,
  `landscaping_planned_start` date NOT NULL,
  `landscaping_planned_finish` date NOT NULL,
  `landscaping_actual_start` date NOT NULL,
  `landscaping_actual_finish` date NOT NULL,
  `landscaping_planned_cost` varchar(15) NOT NULL,
  `landscaping_actual_cost` varchar(15) NOT NULL,
  `landscaping_contractor` varchar(50) NOT NULL,
  `landscaping_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`landscaping_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `plumbing` (
  `plumbing_id` int(10) NOT NULL AUTO_INCREMENT,
  `plumbing_planned_start` date NOT NULL,
  `plumbing_planned_finish` date NOT NULL,
  `plumbing_actual_start` date NOT NULL,
  `plumbing_actual_finish` date NOT NULL,
  `plumbing_planned_cost` varchar(15) NOT NULL,
  `plumbing_actual_cost` varchar(15) NOT NULL,
  `plumbing_contractor` varchar(50) NOT NULL,
  `plumbing_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`plumbing_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `pool_spa` (
  `pool_spa_id` int(10) NOT NULL AUTO_INCREMENT,
  `pool_spa_planned_start` date NOT NULL,
  `pool_spa_planned_finish` date NOT NULL,
  `pool_spa_actual_start` date NOT NULL,
  `pool_spa_actual_finish` date NOT NULL,
  `pool_spa_planned_cost` varchar(15) NOT NULL,
  `pool_spa_actual_cost` varchar(15) NOT NULL,
  `pool_spa_contractor` varchar(50) NOT NULL,
  `pool_spa_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`pool_spa_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `roof` (
  `roof_id` int(10) NOT NULL AUTO_INCREMENT,
  `roof_planned_start` date NOT NULL,
  `roof_planned_finish` date NOT NULL,
  `roof_actual_start` date NOT NULL,
  `roof_actual_finish` date NOT NULL,
  `roof_planned_cost` varchar(15) NOT NULL,
  `roof_actual_cost` varchar(15) NOT NULL,
  `roof_contractor` varchar(50) NOT NULL,
  `roof_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`roof_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `sales_clean` (
  `sales_clean_id` int(10) NOT NULL AUTO_INCREMENT,
  `sales_clean_planned_start` date NOT NULL,
  `sales_clean_planned_finish` date NOT NULL,
  `sales_clean_actual_start` date NOT NULL,
  `sales_clean_actual_finish` date NOT NULL,
  `sales_clean_planned_cost` varchar(15) NOT NULL,
  `sales_clean_actual_cost` varchar(15) NOT NULL,
  `sales_clean_contractor` varchar(50) NOT NULL,
  `sales_clean_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`sales_clean_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `stucco` (
  `stucco_id` int(10) NOT NULL AUTO_INCREMENT,
  `stucco_planned_start` date NOT NULL,
  `stucco_planned_finish` date NOT NULL,
  `stucco_actual_start` date NOT NULL,
  `stucco_actual_finish` date NOT NULL,
  `stucco_planned_cost` varchar(15) NOT NULL,
  `stucco_actual_cost` varchar(15) NOT NULL,
  `stucco_contractor` varchar(50) NOT NULL,
  `stucco_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`stucco_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `windows` (
  `windows_id` int(10) NOT NULL AUTO_INCREMENT,
  `windows_planned_start` date NOT NULL,
  `windows_planned_finish` date NOT NULL,
  `windows_actual_start` date NOT NULL,
  `windows_actual_finish` date NOT NULL,
  `windows_planned_cost` varchar(15) NOT NULL,
  `windows_actual_cost` varchar(15) NOT NULL,
  `windows_contractor` varchar(50) NOT NULL,
  `windows_notes` varchar(300) NOT NULL,
  `rehab_id` int(11) NOT NULL,
  PRIMARY KEY (`windows_id`),
  FOREIGN KEY (`rehab_id`) REFERENCES rehabs(rehab_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;




--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `rehab_activity_logs` (
  `log_id` int(10) NOT NULL AUTO_INCREMENT,
  `comment` varchar(5000) NOT NULL,
  `users_uid` int(11) NOT NULL,
  `properties_pid` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  FOREIGN KEY (`properties_pid`) REFERENCES properties(pid),
  FOREIGN KEY (`users_uid`) REFERENCES users(uid)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


--
-- Table structure for table `open_bids`
--

CREATE TABLE IF NOT EXISTS `open_bids` (
  `bid_id` int(10) NOT NULL AUTO_INCREMENT,
  `bid_pid` int(10) NOT NULL,
  `bid_cat_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bid_id`),
  FOREIGN KEY (`bid_pid`) REFERENCES properties(pid),
  FOREIGN KEY (`bid_cat_id`) REFERENCES categories(cat_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Table structure for table `bid_tasks`
--

CREATE TABLE IF NOT EXISTS `bid_tasks` (
  `bid_task_id` int(10) NOT NULL AUTO_INCREMENT,
  `bid_id` int(10) NOT NULL,
  `task_id` int(10) NOT NULL,
  `desc` varchar(250) NOT NULL,
  `qty` int(15) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bid_task_id`),
  FOREIGN KEY (`bid_id`) REFERENCES open_bids(bid_id),
  FOREIGN KEY (`task_id`) REFERENCES tasks(task_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Table structure for `escrow` & `escrow_day#` tables
--
CREATE TABLE IF NOT EXISTS `escrow` (
  `escrow_id` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`escrow_id`),
  FOREIGN KEY (`pid`) REFERENCES properties(pid)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `escrow_day01` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `escrow_id` int(10) NOT NULL,
  `open` varchar(6) NOT NULL,
  `contract` varchar(6) NOT NULL,
  `nhd` varchar(6) NOT NULL,
  `intro_email` varchar(6) NOT NULL,
  `work_on_disclosures` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`escrow_id`) REFERENCES escrow(escrow_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `escrow_day03` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `escrow_id` int(10) NOT NULL,
  `emd_followup` varchar(6) NOT NULL,
  `send_qs` varchar(6) NOT NULL,
  `send_qs_date` date NOT NULL,
  `ask_home_inspect` varchar(6) NOT NULL,
  `home_inspect` varchar(6) NOT NULL,
  `ask_home_inspect_date` DATE NOT NULL,
  `send_disclosures` varchar(6) NOT NULL,
  `send_dis_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`escrow_id`) REFERENCES escrow(escrow_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `escrow_day07` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `escrow_id` int(10) NOT NULL,
  `send_instruct_back` varchar(6) NOT NULL,
  `send_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`escrow_id`) REFERENCES escrow(escrow_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `escrow_day12` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `escrow_id` int(10) NOT NULL,
  `disclosures_followup` varchar(6) NOT NULL,
  `followup_date` date NOT NULL,
  `check_loan_approval` varchar(6) NOT NULL,
  `check_loan_date` date NOT NULL,
  `termite_report` varchar(6) NOT NULL,
  `termite_report_date` DATE NOT NULL,
  `termite_clear` varchar(6) NOT NULL,
  `termite_clear_date` DATE NOT NULL,
  `go_over_file` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`escrow_id`) REFERENCES escrow(escrow_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `escrow_day15` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `escrow_id` int(10) NOT NULL,
  `send_contingency` varchar(6) NOT NULL,
  `send_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`escrow_id`) REFERENCES escrow(escrow_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `escrow_day21` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `escrow_id` int(10) NOT NULL,
  `loan_contingency` varchar(6) NOT NULL,
  `loan_contingency_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`escrow_id`) REFERENCES escrow(escrow_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `escrow_day23` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `escrow_id` int(10) NOT NULL,
  `request_warranty` varchar(6) NOT NULL,
  `request_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`escrow_id`) REFERENCES escrow(escrow_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `escrow_forms` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL,
  `escrow` tinyint(1) NOT NULL DEFAULT 0,
  `home_liberty` tinyint(1) NOT NULL DEFAULT 0,
  `ad` tinyint(1) NOT NULL DEFAULT 0,
  `bia` tinyint(1) NOT NULL DEFAULT 0,
  `sbsa` tinyint(1) NOT NULL DEFAULT 0,
  `ac` tinyint(1) NOT NULL DEFAULT 0,
  `fvac` tinyint(1) NOT NULL DEFAULT 0,
  `tds` tinyint(1) NOT NULL DEFAULT 0,
  `sbq` tinyint(1) NOT NULL DEFAULT 0,
  `hid` tinyint(1) NOT NULL DEFAULT 0,
  `cmd` tinyint(1) NOT NULL DEFAULT 0,
  `fld` tinyint(1) NOT NULL DEFAULT 0,
  `eq` tinyint(1) NOT NULL DEFAULT 0,
  `whsd` tinyint(1) NOT NULL DEFAULT 0,
  `wcmd` tinyint(1) NOT NULL DEFAULT 0,
  `wfa` tinyint(1) NOT NULL DEFAULT 0,
  `dbd` tinyint(1) NOT NULL DEFAULT 0,
  `selling_avid` tinyint(1) NOT NULL DEFAULT 0,
  `listing_avid` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pid`) REFERENCES properties(pid)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Table structure for table `offers`
--

CREATE TABLE IF NOT EXISTS `offers` (
  `offer_id` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL,
  `buyer` varchar(25) NOT NULL,
  `financing` varchar(25) NOT NULL,
  `closing` varchar(25) NOT NULL,
  `deposit` int(12) NOT NULL,
  `offer_price` int(12) NOT NULL,
  `comp` varchar(25) NOT NULL,
  `ccnr` int(12) NOT NULL,
  `counter` int(12) NOT NULL,
  `title` varchar(25) NOT NULL,
  `escrow` varchar(25) NOT NULL,
  `termite` varchar(25) NOT NULL,
  `nhd` varchar(25) NOT NULL,
  `septic` varchar(25) NOT NULL,
  `retrofit` varchar(25) NOT NULL,
  `co_fees` varchar(25) NOT NULL,
  `city_fees` varchar(25) NOT NULL,
  `fico` varchar(25) NOT NULL,
  `pof` varchar(25) NOT NULL,
  `other_terms` varchar(25) NOT NULL,
  `notes` varchar(25) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`offer_id`),
  FOREIGN KEY (`pid`) REFERENCES properties(pid)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `bath` ADD `bath_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `bath_notes`;
ALTER TABLE `demo` ADD `demo_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `demo_notes`;
ALTER TABLE `drywall` ADD `drywall_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `drywall_notes`;
ALTER TABLE `electrical` ADD `electrical_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `electrical_notes`;
ALTER TABLE `ext_paint` ADD `ext_paint_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `ext_paint_notes`;
ALTER TABLE `fixtures` ADD `fixtures_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `fixtures_notes`;
ALTER TABLE `flooring` ADD `flooring_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `flooring_notes`;
ALTER TABLE `framing` ADD `framing_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `framing_notes`;
ALTER TABLE `garage_door` ADD `garage_door_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `garage_door_notes`;
ALTER TABLE `hardscape` ADD `hardscape_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `hardscape_notes`;
ALTER TABLE `hvac` ADD `hvac_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `hvac_notes`;
ALTER TABLE `int_paint` ADD `int_paint_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `int_paint_notes`;
ALTER TABLE `kitchen` ADD `kitchen_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `kitchen_notes`;
ALTER TABLE `landscaping` ADD `landscaping_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `landscaping_notes`;
ALTER TABLE `plumbing` ADD `plumbing_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `plumbing_notes`;
ALTER TABLE `pool_spa` ADD `pool_spa_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `pool_spa_notes`;
ALTER TABLE `roof` ADD `roof_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `roof_notes`;
ALTER TABLE `sales_clean` ADD `sales_clean_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `sales_clean_notes`;
ALTER TABLE `stucco` ADD `stucco_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `stucco_notes`;
ALTER TABLE `windows` ADD `windows_comp_perc` INT(5) NOT NULL DEFAULT '0' AFTER `windows_notes`;

ALTER TABLE `escrow_day15` ADD `send_acknowledge` tinyint(1) NOT NULL DEFAULT '0' AFTER `send_contingency_date`;
ALTER TABLE `escrow_day15` ADD `send_acknowledge_date` DATE NOT NULL AFTER `acknowledge`;
ALTER TABLE `escrow_day21` ADD `loan_acknowledge` tinyint(1) NOT NULL DEFAULT '0' AFTER `loan_contingency_date`;
ALTER TABLE `escrow_day21` ADD `loan_acknowledge_date` DATE NOT NULL AFTER `acknowledge`;

CREATE TABLE `selling_closing_costs` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `category` varchar(15) NOT NULL,
  `description` varchar(250) NOT NULL,
  `cost` int(15) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `offers` DROP `comp`, DROP `retrofit`;
ALTER TABLE `offers` CHANGE `ccnr` `closing_costs` INT(12) NOT NULL;
ALTER TABLE `offers` ADD `hoa` INT(12) NOT NULL AFTER `counter`;
ALTER TABLE `offers` ADD `home_warranty` INT(12) NOT NULL AFTER `hoa`;


ALTER TABLE `properties` ADD `profit` INT(16) NOT NULL AFTER `sale_price`;
ALTER TABLE `properties` ADD `pre_sale_costs` INT(16) NOT NULL AFTER `profit`;
ALTER TABLE `properties` ADD `sales_costs` INT(16) NOT NULL AFTER `pre_sale_costs`;
ALTER TABLE `properties` CHANGE `purchase_cost` `purchase_cost` INT(16) NOT NULL;
ALTER TABLE `properties` CHANGE `rehab_estimate` `rehab_estimate` INT(13) NOT NULL;
ALTER TABLE `properties` CHANGE `arv` `arv` INT(16) NOT NULL;
ALTER TABLE `properties` CHANGE `list_price` `list_price` INT(16) NOT NULL;
ALTER TABLE `properties` CHANGE `escrow_price` `escrow_price` INT(16) NOT NULL;
ALTER TABLE `properties` CHANGE `sale_price` `sale_price` INT(16) NOT NULL;
ALTER TABLE `bath` CHANGE `bath_planned_cost` `bath_planned_cost` INT(16) NOT NULL, CHANGE `bath_actual_cost` `bath_actual_cost` INT(16) NOT NULL;
ALTER TABLE `demo` CHANGE `demo_planned_cost` `demo_planned_cost` INT(16) NOT NULL, CHANGE `demo_actual_cost` `demo_actual_cost` INT(16) NOT NULL;
ALTER TABLE `drywall` CHANGE `drywall_planned_cost` `drywall_planned_cost` INT(16) NOT NULL, CHANGE `drywall_actual_cost` `drywall_actual_cost` INT(16) NOT NULL;
ALTER TABLE `electrical` CHANGE `electrical_planned_cost` `electrical_planned_cost` INT(16) NOT NULL, CHANGE `electrical_actual_cost` `electrical_actual_cost` INT(16) NOT NULL;
ALTER TABLE `ext_paint` CHANGE `ext_paint_planned_cost` `ext_paint_planned_cost` INT(16) NOT NULL, CHANGE `ext_paint_actual_cost` `ext_paint_actual_cost` INT(16) NOT NULL;
ALTER TABLE `fixtures` CHANGE `fixtures_planned_cost` `fixtures_planned_cost` INT(16) NOT NULL, CHANGE `fixtures_actual_cost` `fixtures_actual_cost` INT(16) NOT NULL;
ALTER TABLE `flooring` CHANGE `flooring_planned_cost` `flooring_planned_cost` INT(16) NOT NULL, CHANGE `flooring_actual_cost` `flooring_actual_cost` INT(16) NOT NULL;
ALTER TABLE `framing` CHANGE `framing_planned_cost` `framing_planned_cost` INT(16) NOT NULL, CHANGE `framing_actual_cost` `framing_actual_cost` INT(16) NOT NULL;
ALTER TABLE `garage_door` CHANGE `garage_door_planned_cost` `garage_door_planned_cost` INT(16) NOT NULL, CHANGE `garage_door_actual_cost` `garage_door_actual_cost` INT(16) NOT NULL;
ALTER TABLE `hardscape` CHANGE `hardscape_planned_cost` `hardscape_planned_cost` INT(16) NOT NULL, CHANGE `hardscape_actual_cost` `hardscape_actual_cost` INT(16) NOT NULL;
ALTER TABLE `hvac` CHANGE `hvac_planned_cost` `hvac_planned_cost` INT(16) NOT NULL, CHANGE `hvac_actual_cost` `hvac_actual_cost` INT(16) NOT NULL;
ALTER TABLE `int_paint` CHANGE `int_paint_planned_cost` `int_paint_planned_cost` INT(16) NOT NULL, CHANGE `int_paint_actual_cost` `int_paint_actual_cost` INT(16) NOT NULL;
ALTER TABLE `kitchen` CHANGE `kitchen_planned_cost` `kitchen_planned_cost` INT(16) NOT NULL, CHANGE `kitchen_actual_cost` `kitchen_actual_cost` INT(16) NOT NULL;
ALTER TABLE `landscaping` CHANGE `landscaping_planned_cost` `landscaping_planned_cost` INT(16) NOT NULL, CHANGE `landscaping_actual_cost` `landscaping_actual_cost` INT(16) NOT NULL;
ALTER TABLE `plumbing` CHANGE `plumbing_planned_cost` `plumbing_planned_cost` INT(16) NOT NULL, CHANGE `plumbing_actual_cost` `plumbing_actual_cost` INT(16) NOT NULL;
ALTER TABLE `pool_spa` CHANGE `pool_spa_planned_cost` `pool_spa_planned_cost` INT(16) NOT NULL, CHANGE `pool_spa_actual_cost` `pool_spa_actual_cost` INT(16) NOT NULL;
ALTER TABLE `roof` CHANGE `roof_planned_cost` `roof_planned_cost` INT(16) NOT NULL, CHANGE `roof_actual_cost` `roof_actual_cost` INT(16) NOT NULL;
ALTER TABLE `sales_clean` CHANGE `sales_clean_planned_cost` `sales_clean_planned_cost` INT(16) NOT NULL, CHANGE `sales_clean_actual_cost` `sales_clean_actual_cost` INT(16) NOT NULL;
ALTER TABLE `stucco` CHANGE `stucco_planned_cost` `stucco_planned_cost` INT(16) NOT NULL, CHANGE `stucco_actual_cost` `stucco_actual_cost` INT(16) NOT NULL;
ALTER TABLE `windows` CHANGE `windows_planned_cost` `windows_planned_cost` INT(16) NOT NULL, CHANGE `windows_actual_cost` `windows_actual_cost` INT(16) NOT NULL;
ALTER TABLE `rehabs` ADD `accrued_costs` INT(16) NOT NULL AFTER `comp_percent`;
ALTER TABLE `properties` CHANGE `sqft` `sqft` INT(10) NOT NULL, CHANGE `lotsize` `lotsize` INT(10) NOT NULL;


CREATE TABLE `proforma_projected` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `purchase_cost` int(16) NOT NULL,
  `purchase_closing_costs` int(13) NOT NULL,
  `rehab_estimate` int(13) NOT NULL,
  `other_costs` int(10) NOT NULL,
  `selling_closing_costs` int(13) NOT NULL,
  `loan_amount` int(11) NOT NULL,
  `apr` int(5) NOT NULL,
  `months` int(5) NOT NULL,
  `fees` int(11) NOT NULL,
  `opening_points` int(5) NOT NULL,
  `buyer_percent` int(5) NOT NULL,
  `tca` int(8) NOT NULL,
  `commission_percent` int(5) NOT NULL,
  `jeremy_pocket` int(11) NOT NULL,
  `codrin_pocket` int(11) NOT NULL,
  `tetakawi_share_percent` float NOT NULL,
  `arv` int(16) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pid`) REFERENCES properties(pid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `proforma_actual` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `purchase_cost` int(16) NOT NULL,
  `purchase_closing_costs` int(13) NOT NULL,
  `rehab_estimate` int(13) NOT NULL,
  `other_costs` int(10) NOT NULL,
  `selling_closing_costs` int(13) NOT NULL,
  `loan_amount` int(11) NOT NULL,
  `apr` int(5) NOT NULL,
  `months` int(5) NOT NULL,
  `fees` int(11) NOT NULL,
  `opening_points` int(5) NOT NULL,
  `buyer_percent` int(5) NOT NULL,
  `tca` int(8) NOT NULL,
  `commission_percent` int(5) NOT NULL,
  `jeremy_pocket` int(11) NOT NULL,
  `codrin_pocket` int(11) NOT NULL,
  `tetakawi_share_percent` float NOT NULL,
  `arv` int(16) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pid`) REFERENCES properties(pid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


---
-- Jun 12th
---

ALTER TABLE `proforma` CHANGE `apr` `apr` FLOAT(5) NOT NULL, CHANGE `opening_points` `opening_points` FLOAT(5) NOT NULL, CHANGE `selling_costs_percent` `selling_costs_percent` FLOAT(5) NOT NULL, CHANGE `buyer_percent` `buyer_percent` FLOAT(5) NOT NULL, CHANGE `commission_percent` `commission_percent` FLOAT(5) NOT NULL, CHANGE `tetakawi_share_percent` `tetakawi_share_percent` FLOAT NOT NULL;


---
-- June 14th
---

ALTER TABLE `user_settings` CHANGE `fha` `fha` TINYINT(1) NOT NULL DEFAULT '1', CHANGE `dsp` `dsp` TINYINT(1) NOT NULL DEFAULT '1', CHANGE `supervisor` `supervisor` TINYINT(1) NOT NULL DEFAULT '1', CHANGE `permits` `permits` TINYINT(1) NOT NULL DEFAULT '1', CHANGE `estimated_completion` `estimated_completion` TINYINT(1) NOT NULL DEFAULT '1';
ALTER TABLE `user_settings` ADD `purchase_date` TINYINT(1) NOT NULL DEFAULT '1' AFTER `estimated_completion`, ADD `lender` TINYINT(1) NOT NULL DEFAULT '1' AFTER `purchase_date`;
ALTER TABLE `user_settings` CHANGE `purchase_date` `purchase_close_date` TINYINT(1) NOT NULL DEFAULT '1';
ALTER TABLE `properties` CHANGE `status` `status` VARCHAR(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `properties` ADD `loan_amount` INT(16) NOT NULL AFTER `arv`;

CREATE TABLE `listing_images` (
  `image_id` int(10) NOT NULL,
  `image_name` varchar(50) NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `listing_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `pid` (`pid`);

ALTER TABLE `listing_images`
  MODIFY `image_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `listing_images`
  ADD CONSTRAINT `listing_images_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `offers` ADD `agent_id` INT(11) NOT NULL AFTER `pid`;

ALTER TABLE `offers`
ADD CONSTRAINT `offers_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`agent_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `proforma` CHANGE `apr` `apr` FLOAT(5) NOT NULL, CHANGE `opening_points` `opening_points` FLOAT(5) NOT NULL, CHANGE `selling_costs_percent` `selling_costs_percent` FLOAT(5) NOT NULL, CHANGE `buyer_percent` `buyer_percent` FLOAT(5) NOT NULL, CHANGE `commission_percent` `commission_percent` FLOAT(5) NOT NULL, CHANGE `tetakawi_share_percent` `tetakawi_share_percent` FLOAT NOT NULL;

ALTER TABLE `user_settings` ADD `loan_amount` TINYINT(1) NOT NULL DEFAULT '1' AFTER `arv`, ADD `list_price` TINYINT(1) NOT NULL DEFAULT '1' AFTER `loan_amount`, ADD `sale_price` TINYINT(1) NOT NULL DEFAULT '1' AFTER `list_price`;
ALTER TABLE `user_settings` ADD `purchase_close_date` TINYINT(1) NOT NULL DEFAULT '1' AFTER `arv`, ADD `lender` TINYINT(1) NOT NULL DEFAULT '1' AFTER `purchase_close_date`;
ALTER TABLE `user_settings` CHANGE `estimated_completion` `est_completion` TINYINT(1) NOT NULL DEFAULT '1';

CREATE TABLE `lenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lender_name` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `entity_vesting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entity` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `supervisors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supervisor` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `asset_managers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manager` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


RENAME TABLE `categories` to `sections`;
ALTER TABLE `sections` CHANGE `cat_id` `id` INT(11) NOT NULL AUTO_INCREMENT, CHANGE `cat_name` `name` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `open_bids` ADD `bid_total_cost` INT(10) NOT NULL AFTER `bid_cat_id`;
ALTER TABLE `bid_tasks` ADD `total_cost` INT(10) NOT NULL AFTER `task_id`;

ALTER TABLE `tasks` ADD `default_qty` VARCHAR(16) NOT NULL AFTER `task_units`;
ALTER TABLE `open_bids` ADD `bid_num` INT(5) NOT NULL AFTER `bid_id`;
ALTER TABLE `bid_tasks` CHANGE `total_cost` `task_total` INT(10) NOT NULL;
ALTER TABLE `bid_tasks` ADD `qty` INT(10) NOT NULL DEFAULT '1' AFTER `task_id`;
ALTER TABLE `bid_tasks` ADD `description` VARCHAR(300) NOT NULL AFTER `task_total`;
ALTER TABLE `bid_tasks` DROP FOREIGN KEY `bid_tasks_ibfk_2`;
ALTER TABLE `bid_tasks` DROP `task_id`;
ALTER TABLE `bid_tasks` ADD `task_name` VARCHAR(60) NOT NULL AFTER `qty`, ADD `task_cost` FLOAT NOT NULL AFTER `task_name`, ADD `task_units` VARCHAR(25) NOT NULL AFTER `task_cost`;
-------------------------- UP TO DATE ----------------------------
ALTER TABLE `escrow` ADD `agent_id` INT(11) NOT NULL AFTER `pid`;
ALTER TABLE `escrow`
  ADD CONSTRAINT `agents_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`agent_id`) ON DELETE CASCADE ON UPDATE CASCADE;