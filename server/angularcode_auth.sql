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