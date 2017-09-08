-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 08, 2017 at 01:02 PM
-- Server version: 5.7.19-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `structured_cap`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `agent_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `bre` varchar(15) NOT NULL,
  `mls_id` varchar(15) NOT NULL,
  `early_showing` varchar(15) NOT NULL,
  `open_house` varchar(15) NOT NULL,
  `sb` tinyint(1) NOT NULL DEFAULT '0',
  `riv` tinyint(1) NOT NULL DEFAULT '0',
  `la` tinyint(1) NOT NULL DEFAULT '0',
  `sd` tinyint(1) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `agents`
--

INSERT INTO `agents` (`agent_id`, `first_name`, `last_name`, `email`, `phone`, `bre`, `mls_id`, `early_showing`, `open_house`, `sb`, `riv`, `la`, `sd`, `created`) VALUES
(1, 'Sample', 'Agent', 'agent@example.com', '(555) 555-5555', '01010101', '1', '1', '1', 1, 1, 1, 1, '2017-04-28 01:01:51');

-- --------------------------------------------------------

--
-- Table structure for table `asset_managers`
--

CREATE TABLE `asset_managers` (
  `id` int(11) NOT NULL,
  `manager` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asset_managers`
--

INSERT INTO `asset_managers` (`id`, `manager`) VALUES
(1, 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `bath`
--

CREATE TABLE `bath` (
  `bath_id` int(10) NOT NULL,
  `bath_planned_start` date NOT NULL,
  `bath_planned_finish` date NOT NULL,
  `bath_actual_start` date NOT NULL,
  `bath_actual_finish` date NOT NULL,
  `bath_planned_cost` int(16) NOT NULL,
  `bath_actual_cost` int(16) NOT NULL,
  `bath_contractor` varchar(50) NOT NULL,
  `bath_notes` varchar(300) NOT NULL,
  `bath_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `bid_tasks`
--

CREATE TABLE `bid_tasks` (
  `bid_task_id` int(10) NOT NULL,
  `bid_id` int(10) NOT NULL,
  `task_total` int(10) NOT NULL,
  `description` varchar(300) NOT NULL,
  `qty` int(15) NOT NULL,
  `task_name` varchar(60) NOT NULL,
  `task_cost` float NOT NULL,
  `task_units` varchar(25) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(10) NOT NULL,
  `comment` varchar(5000) NOT NULL,
  `users_uid` int(11) NOT NULL,
  `properties_pid` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `demo`
--

CREATE TABLE `demo` (
  `demo_id` int(10) NOT NULL,
  `demo_planned_start` date NOT NULL,
  `demo_planned_finish` date NOT NULL,
  `demo_actual_start` date NOT NULL,
  `demo_actual_finish` date NOT NULL,
  `demo_planned_cost` int(16) NOT NULL,
  `demo_actual_cost` int(16) NOT NULL,
  `demo_contractor` varchar(50) NOT NULL,
  `demo_notes` varchar(300) NOT NULL,
  `demo_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `drywall`
--

CREATE TABLE `drywall` (
  `drywall_id` int(10) NOT NULL,
  `drywall_planned_start` date NOT NULL,
  `drywall_planned_finish` date NOT NULL,
  `drywall_actual_start` date NOT NULL,
  `drywall_actual_finish` date NOT NULL,
  `drywall_planned_cost` int(16) NOT NULL,
  `drywall_actual_cost` int(16) NOT NULL,
  `drywall_contractor` varchar(50) NOT NULL,
  `drywall_notes` varchar(300) NOT NULL,
  `drywall_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `electrical`
--

CREATE TABLE `electrical` (
  `electrical_id` int(10) NOT NULL,
  `electrical_planned_start` date NOT NULL,
  `electrical_planned_finish` date NOT NULL,
  `electrical_actual_start` date NOT NULL,
  `electrical_actual_finish` date NOT NULL,
  `electrical_planned_cost` int(16) NOT NULL,
  `electrical_actual_cost` int(16) NOT NULL,
  `electrical_contractor` varchar(50) NOT NULL,
  `electrical_notes` varchar(300) NOT NULL,
  `electrical_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `entity_vesting`
--

CREATE TABLE `entity_vesting` (
  `id` int(11) NOT NULL,
  `entity` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `entity_vesting`
--

INSERT INTO `entity_vesting` (`id`, `entity`) VALUES
(1, 'Entity');

-- --------------------------------------------------------

--
-- Table structure for table `escrow`
--

CREATE TABLE `escrow` (
  `escrow_id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `escrow_day01`
--

CREATE TABLE `escrow_day01` (
  `id` int(10) NOT NULL,
  `escrow_id` int(10) NOT NULL,
  `open` varchar(6) NOT NULL,
  `contract` varchar(6) NOT NULL,
  `nhd` varchar(6) NOT NULL,
  `intro_email` varchar(6) NOT NULL,
  `work_on_disclosures` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `escrow_day03`
--

CREATE TABLE `escrow_day03` (
  `id` int(10) NOT NULL,
  `escrow_id` int(10) NOT NULL,
  `emd_followup` varchar(6) NOT NULL,
  `send_qs` varchar(6) NOT NULL,
  `send_qs_date` date NOT NULL,
  `ask_home_inspect` varchar(6) NOT NULL,
  `home_inspect` varchar(6) NOT NULL,
  `ask_home_inspect_date` date NOT NULL,
  `send_disclosures` varchar(6) NOT NULL,
  `send_dis_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `escrow_day07`
--

CREATE TABLE `escrow_day07` (
  `id` int(10) NOT NULL,
  `escrow_id` int(10) NOT NULL,
  `send_instruct_back` varchar(6) NOT NULL,
  `send_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `escrow_day12`
--

CREATE TABLE `escrow_day12` (
  `id` int(10) NOT NULL,
  `escrow_id` int(10) NOT NULL,
  `disclosures_followup` varchar(6) NOT NULL,
  `followup_date` date NOT NULL,
  `check_loan_approval` varchar(6) NOT NULL,
  `check_loan_date` date NOT NULL,
  `termite_report` varchar(6) NOT NULL,
  `termite_report_date` date NOT NULL,
  `termite_clear` varchar(6) NOT NULL,
  `termite_clear_date` date NOT NULL,
  `go_over_file` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `escrow_day15`
--

CREATE TABLE `escrow_day15` (
  `id` int(10) NOT NULL,
  `escrow_id` int(10) NOT NULL,
  `send_contingency` varchar(6) NOT NULL,
  `send_contingency_date` date NOT NULL,
  `send_acknowledge` tinyint(1) NOT NULL DEFAULT '0',
  `acknowledge` tinyint(1) NOT NULL DEFAULT '0',
  `send_acknowledge_date` date NOT NULL,
  `acknowledge_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `escrow_day21`
--

CREATE TABLE `escrow_day21` (
  `id` int(10) NOT NULL,
  `escrow_id` int(10) NOT NULL,
  `loan_contingency` varchar(6) NOT NULL,
  `loan_contingency_date` date NOT NULL,
  `loan_acknowledge` tinyint(1) NOT NULL DEFAULT '0',
  `acknowledge` tinyint(1) NOT NULL DEFAULT '0',
  `loan_acknowledge_date` date NOT NULL,
  `acknowledge_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `escrow_day23`
--

CREATE TABLE `escrow_day23` (
  `id` int(10) NOT NULL,
  `escrow_id` int(10) NOT NULL,
  `request_warranty` varchar(6) NOT NULL,
  `request_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `escrow_forms`
--

CREATE TABLE `escrow_forms` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `escrow` tinyint(1) NOT NULL DEFAULT '0',
  `home_liberty` tinyint(1) NOT NULL DEFAULT '0',
  `ad` tinyint(1) NOT NULL DEFAULT '0',
  `bia` tinyint(1) NOT NULL DEFAULT '0',
  `sbsa` tinyint(1) NOT NULL DEFAULT '0',
  `ac` tinyint(1) NOT NULL DEFAULT '0',
  `fvac` tinyint(1) NOT NULL DEFAULT '0',
  `tds` tinyint(1) NOT NULL DEFAULT '0',
  `sbq` tinyint(1) NOT NULL DEFAULT '0',
  `hid` tinyint(1) NOT NULL DEFAULT '0',
  `cmd` tinyint(1) NOT NULL DEFAULT '0',
  `fld` tinyint(1) NOT NULL DEFAULT '0',
  `eq` tinyint(1) NOT NULL DEFAULT '0',
  `whsd` tinyint(1) NOT NULL DEFAULT '0',
  `wcmd` tinyint(1) NOT NULL DEFAULT '0',
  `wfa` tinyint(1) NOT NULL DEFAULT '0',
  `dbd` tinyint(1) NOT NULL DEFAULT '0',
  `selling_avid` tinyint(1) NOT NULL DEFAULT '0',
  `listing_avid` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `ext_paint`
--

CREATE TABLE `ext_paint` (
  `ext_paint_id` int(10) NOT NULL,
  `ext_paint_planned_start` date NOT NULL,
  `ext_paint_planned_finish` date NOT NULL,
  `ext_paint_actual_start` date NOT NULL,
  `ext_paint_actual_finish` date NOT NULL,
  `ext_paint_planned_cost` int(16) NOT NULL,
  `ext_paint_actual_cost` int(16) NOT NULL,
  `ext_paint_contractor` varchar(50) NOT NULL,
  `ext_paint_notes` varchar(300) NOT NULL,
  `ext_paint_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `fixtures`
--

CREATE TABLE `fixtures` (
  `fixtures_id` int(10) NOT NULL,
  `fixtures_planned_start` date NOT NULL,
  `fixtures_planned_finish` date NOT NULL,
  `fixtures_actual_start` date NOT NULL,
  `fixtures_actual_finish` date NOT NULL,
  `fixtures_planned_cost` int(16) NOT NULL,
  `fixtures_actual_cost` int(16) NOT NULL,
  `fixtures_contractor` varchar(50) NOT NULL,
  `fixtures_notes` varchar(300) NOT NULL,
  `fixtures_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `flooring`
--

CREATE TABLE `flooring` (
  `flooring_id` int(10) NOT NULL,
  `flooring_planned_start` date NOT NULL,
  `flooring_planned_finish` date NOT NULL,
  `flooring_actual_start` date NOT NULL,
  `flooring_actual_finish` date NOT NULL,
  `flooring_planned_cost` int(16) NOT NULL,
  `flooring_actual_cost` int(16) NOT NULL,
  `flooring_contractor` varchar(50) NOT NULL,
  `flooring_notes` varchar(300) NOT NULL,
  `flooring_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `framing`
--

CREATE TABLE `framing` (
  `framing_id` int(10) NOT NULL,
  `framing_planned_start` date NOT NULL,
  `framing_planned_finish` date NOT NULL,
  `framing_actual_start` date NOT NULL,
  `framing_actual_finish` date NOT NULL,
  `framing_planned_cost` int(16) NOT NULL,
  `framing_actual_cost` int(16) NOT NULL,
  `framing_contractor` varchar(50) NOT NULL,
  `framing_notes` varchar(300) NOT NULL,
  `framing_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `garage_door`
--

CREATE TABLE `garage_door` (
  `garage_door_id` int(10) NOT NULL,
  `garage_door_planned_start` date NOT NULL,
  `garage_door_planned_finish` date NOT NULL,
  `garage_door_actual_start` date NOT NULL,
  `garage_door_actual_finish` date NOT NULL,
  `garage_door_planned_cost` int(16) NOT NULL,
  `garage_door_actual_cost` int(16) NOT NULL,
  `garage_door_contractor` varchar(50) NOT NULL,
  `garage_door_notes` varchar(300) NOT NULL,
  `garage_door_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `hardscape`
--

CREATE TABLE `hardscape` (
  `hardscape_id` int(10) NOT NULL,
  `hardscape_planned_start` date NOT NULL,
  `hardscape_planned_finish` date NOT NULL,
  `hardscape_actual_start` date NOT NULL,
  `hardscape_actual_finish` date NOT NULL,
  `hardscape_planned_cost` int(16) NOT NULL,
  `hardscape_actual_cost` int(16) NOT NULL,
  `hardscape_contractor` varchar(50) NOT NULL,
  `hardscape_notes` varchar(300) NOT NULL,
  `hardscape_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `hvac`
--

CREATE TABLE `hvac` (
  `hvac_id` int(10) NOT NULL,
  `hvac_planned_start` date NOT NULL,
  `hvac_planned_finish` date NOT NULL,
  `hvac_actual_start` date NOT NULL,
  `hvac_actual_finish` date NOT NULL,
  `hvac_planned_cost` int(16) NOT NULL,
  `hvac_actual_cost` int(16) NOT NULL,
  `hvac_contractor` varchar(50) NOT NULL,
  `hvac_notes` varchar(300) NOT NULL,
  `hvac_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image_id` int(10) NOT NULL,
  `image_name` varchar(50) NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `image_name`, `pid`) VALUES
(6, '2-Kitchen-1.jpg', 2),
(8, '4-Bathroom-main-2.jpg', 2),
(12, '7-Garage-2.jpg', 2),
(13, '8-Backyard-1.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `int_paint`
--

CREATE TABLE `int_paint` (
  `int_paint_id` int(10) NOT NULL,
  `int_paint_planned_start` date NOT NULL,
  `int_paint_planned_finish` date NOT NULL,
  `int_paint_actual_start` date NOT NULL,
  `int_paint_actual_finish` date NOT NULL,
  `int_paint_planned_cost` int(16) NOT NULL,
  `int_paint_actual_cost` int(16) NOT NULL,
  `int_paint_contractor` varchar(50) NOT NULL,
  `int_paint_notes` varchar(300) NOT NULL,
  `int_paint_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `kitchen`
--

CREATE TABLE `kitchen` (
  `kitchen_id` int(10) NOT NULL,
  `kitchen_planned_start` date NOT NULL,
  `kitchen_planned_finish` date NOT NULL,
  `kitchen_actual_start` date NOT NULL,
  `kitchen_actual_finish` date NOT NULL,
  `kitchen_planned_cost` int(16) NOT NULL,
  `kitchen_actual_cost` int(16) NOT NULL,
  `kitchen_contractor` varchar(50) NOT NULL,
  `kitchen_notes` varchar(300) NOT NULL,
  `kitchen_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `landscaping`
--

CREATE TABLE `landscaping` (
  `landscaping_id` int(10) NOT NULL,
  `landscaping_planned_start` date NOT NULL,
  `landscaping_planned_finish` date NOT NULL,
  `landscaping_actual_start` date NOT NULL,
  `landscaping_actual_finish` date NOT NULL,
  `landscaping_planned_cost` int(16) NOT NULL,
  `landscaping_actual_cost` int(16) NOT NULL,
  `landscaping_contractor` varchar(50) NOT NULL,
  `landscaping_notes` varchar(300) NOT NULL,
  `landscaping_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `lenders`
--

CREATE TABLE `lenders` (
  `id` int(11) NOT NULL,
  `lender` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lenders`
--

INSERT INTO `lenders` (`id`, `lender`) VALUES
(1, 'Lender');

-- --------------------------------------------------------

--
-- Table structure for table `listing_images`
--

CREATE TABLE `listing_images` (
  `image_id` int(10) NOT NULL,
  `image_name` varchar(50) NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `offer_id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `agent_id` int(11) NOT NULL,
  `buyer` varchar(25) NOT NULL,
  `financing` varchar(25) NOT NULL,
  `closing` varchar(25) NOT NULL,
  `deposit` int(12) NOT NULL,
  `offer_price` int(12) NOT NULL,
  `closing_costs` int(12) NOT NULL,
  `counter` int(12) NOT NULL,
  `hoa` int(12) NOT NULL,
  `home_warranty` int(12) NOT NULL,
  `title` varchar(25) NOT NULL,
  `escrow` varchar(25) NOT NULL,
  `termite` varchar(25) NOT NULL,
  `nhd` varchar(25) NOT NULL,
  `septic` varchar(25) NOT NULL,
  `co_fees` varchar(25) NOT NULL,
  `city_fees` varchar(25) NOT NULL,
  `fico` varchar(25) NOT NULL,
  `pof` varchar(25) NOT NULL,
  `other_terms` varchar(300) NOT NULL,
  `notes` varchar(300) NOT NULL,
  `accept` varchar(15) NOT NULL DEFAULT 'not-defined',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `open_bids`
--

CREATE TABLE `open_bids` (
  `bid_id` int(10) NOT NULL,
  `bid_num` int(5) NOT NULL,
  `bid_pid` int(10) NOT NULL,
  `bid_cat_id` int(11) NOT NULL,
  `bid_total_cost` int(10) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `plumbing`
--

CREATE TABLE `plumbing` (
  `plumbing_id` int(10) NOT NULL,
  `plumbing_planned_start` date NOT NULL,
  `plumbing_planned_finish` date NOT NULL,
  `plumbing_actual_start` date NOT NULL,
  `plumbing_actual_finish` date NOT NULL,
  `plumbing_planned_cost` int(16) NOT NULL,
  `plumbing_actual_cost` int(16) NOT NULL,
  `plumbing_contractor` varchar(50) NOT NULL,
  `plumbing_notes` varchar(300) NOT NULL,
  `plumbing_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `pool_spa`
--

CREATE TABLE `pool_spa` (
  `pool_spa_id` int(10) NOT NULL,
  `pool_spa_planned_start` date NOT NULL,
  `pool_spa_planned_finish` date NOT NULL,
  `pool_spa_actual_start` date NOT NULL,
  `pool_spa_actual_finish` date NOT NULL,
  `pool_spa_planned_cost` int(16) NOT NULL,
  `pool_spa_actual_cost` int(16) NOT NULL,
  `pool_spa_contractor` varchar(50) NOT NULL,
  `pool_spa_notes` varchar(300) NOT NULL,
  `pool_spa_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `proforma`
--

CREATE TABLE `proforma` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `other_costs` int(10) NOT NULL,
  `loan_amount` int(11) NOT NULL,
  `apr` float NOT NULL,
  `months` int(5) NOT NULL,
  `fees` int(11) NOT NULL,
  `opening_points` float NOT NULL,
  `selling_costs_percent` float NOT NULL,
  `buyer_percent` float NOT NULL,
  `tca` int(8) NOT NULL,
  `commission_percent` float NOT NULL,
  `jeremy_pocket` int(11) NOT NULL,
  `codrin_pocket` int(11) NOT NULL,
  `tetakawi_share_percent` float NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `proforma_actual`
--

CREATE TABLE `proforma_actual` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `purchase_cost` int(16) NOT NULL,
  `purchase_close_costs` int(13) NOT NULL,
  `rehab_estimate` int(13) NOT NULL,
  `other_costs` int(10) NOT NULL,
  `selling_close_costs` int(13) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `proforma_defaults`
--

CREATE TABLE `proforma_defaults` (
  `id` int(11) NOT NULL,
  `commission_percent` float NOT NULL,
  `tc` float NOT NULL,
  `accounting` float NOT NULL,
  `selling_closing_costs_percent` float NOT NULL,
  `buyer_percent` float NOT NULL,
  `apr` float NOT NULL,
  `months` float NOT NULL,
  `fees` float NOT NULL,
  `opening_points` float NOT NULL,
  `tetakawi_share_percent` float NOT NULL,
  `other_costs` int(11) NOT NULL DEFAULT '0',
  `jeremy_pocket` int(16) NOT NULL DEFAULT '0',
  `codrin_pocket` int(16) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proforma_defaults`
--

INSERT INTO `proforma_defaults` (`id`, `commission_percent`, `tc`, `accounting`, `selling_closing_costs_percent`, `buyer_percent`, `apr`, `months`, `fees`, `opening_points`, `tetakawi_share_percent`, `other_costs`, `jeremy_pocket`, `codrin_pocket`) VALUES
(1, 3, 250, 500, 1, 1, 9, 6, 990, 2, 27.5, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `proforma_projected`
--

CREATE TABLE `proforma_projected` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `purchase_cost` int(16) NOT NULL,
  `purchase_close_costs` int(13) NOT NULL,
  `rehab_estimate` int(13) NOT NULL,
  `other_costs` int(10) NOT NULL,
  `selling_close_costs` int(13) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `pid` int(11) NOT NULL,
  `status` varchar(15) NOT NULL,
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
  `beds` float NOT NULL,
  `baths` float NOT NULL,
  `pool_spa` tinyint(1) DEFAULT NULL,
  `purchase_close_date` date NOT NULL,
  `purchase_cost` int(16) NOT NULL,
  `pre_sale_costs` int(16) NOT NULL,
  `sales_costs` int(16) NOT NULL,
  `occupancy` varchar(15) NOT NULL,
  `notice_date` date NOT NULL,
  `est_possession` date NOT NULL,
  `lockbox_combo` int(10) NOT NULL,
  `alarm_code` int(10) NOT NULL,
  `asset_manager` varchar(10) NOT NULL,
  `supervisor` varchar(25) NOT NULL,
  `permits` varchar(10) NOT NULL,
  `lender` varchar(25) NOT NULL,
  `loan_amount` int(16) NOT NULL,
  `entity_vesting` varchar(10) NOT NULL,
  `rehab_estimate` int(13) NOT NULL,
  `arv` int(16) NOT NULL,
  `rehab_start` date NOT NULL,
  `est_completion` date NOT NULL,
  `is_listed` tinyint(1) DEFAULT NULL,
  `listing_date` date NOT NULL,
  `list_price` int(16) NOT NULL,
  `listdesc` varchar(1000) NOT NULL,
  `escrow_price` int(16) NOT NULL,
  `sale_close_date` date NOT NULL,
  `offer_accept` date NOT NULL,
  `sale_price` int(16) NOT NULL,
  `profit` int(16) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`pid`, `status`, `phase`, `property_type`, `address`, `city`, `zip`, `latlng`, `county`, `year_built`, `sqft`, `lotsize`, `beds`, `baths`, `pool_spa`, `purchase_close_date`, `purchase_cost`, `pre_sale_costs`, `sales_costs`, `occupancy`, `notice_date`, `est_possession`, `lockbox_combo`, `alarm_code`, `asset_manager`, `supervisor`, `permits`, `lender`, `loan_amount`, `entity_vesting`, `rehab_estimate`, `arv`, `rehab_start`, `est_completion`, `is_listed`, `listing_date`, `list_price`, `listdesc`, `escrow_price`, `sale_close_date`, `offer_accept`, `sale_price`, `profit`, `created`) VALUES
(2, 'Closed', 'Sold', 'SFR', '26416 Pacific St', 'Highland', 92346, '34.1288088,-117.2280854', 'SB', 1952, '1157', '10080', 3, 2, 0, '2017-01-13', 150000, 190955, 10073, 'Vacant', '0000-00-00', '2017-01-06', 5225, 0, 'Codrin', 'Armando', 'Yes', '', 161000, 'HEF Inc.', 25000, 230000, '2017-01-25', '2017-03-15', 0, '2017-03-24', 245000, '', 245000, '2017-05-16', '2017-04-13', 245000, 28972, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_closing_costs`
--

CREATE TABLE `purchase_closing_costs` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `category` varchar(15) NOT NULL,
  `description` varchar(250) NOT NULL,
  `cost` int(15) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `rehabs`
--

CREATE TABLE `rehabs` (
  `rehab_id` int(10) NOT NULL,
  `planned_start` date NOT NULL,
  `planned_finish` date NOT NULL,
  `actual_start` date NOT NULL,
  `actual_finish` date NOT NULL,
  `permits` varchar(3) NOT NULL,
  `accrued_costs` int(16) NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `rehabs`
--
DELIMITER $$
CREATE TRIGGER `trigger_initRehabs` AFTER INSERT ON `rehabs` FOR EACH ROW BEGIN
INSERT INTO demo (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO plumbing (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO bath (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO drywall (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO electrical (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO ext_paint (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO fixtures (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO flooring (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO framing (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO garage_door (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO hardscape (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO hvac (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO int_paint (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO kitchen (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO landscaping (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO pool_spa (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO roof (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO sales_clean (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO stucco (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
INSERT INTO windows (rehab_id) SELECT NEW.rehab_id FROM rehabs WHERE rehab_id = NEW.rehab_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rehab_activity_logs`
--

CREATE TABLE `rehab_activity_logs` (
  `log_id` int(10) NOT NULL,
  `comment` varchar(5000) NOT NULL,
  `users_uid` int(11) NOT NULL,
  `properties_pid` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roof`
--

CREATE TABLE `roof` (
  `roof_id` int(10) NOT NULL,
  `roof_planned_start` date NOT NULL,
  `roof_planned_finish` date NOT NULL,
  `roof_actual_start` date NOT NULL,
  `roof_actual_finish` date NOT NULL,
  `roof_planned_cost` int(16) NOT NULL,
  `roof_actual_cost` int(16) NOT NULL,
  `roof_contractor` varchar(50) NOT NULL,
  `roof_notes` varchar(300) NOT NULL,
  `roof_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `sales_clean`
--

CREATE TABLE `sales_clean` (
  `sales_clean_id` int(10) NOT NULL,
  `sales_clean_planned_start` date NOT NULL,
  `sales_clean_planned_finish` date NOT NULL,
  `sales_clean_actual_start` date NOT NULL,
  `sales_clean_actual_finish` date NOT NULL,
  `sales_clean_planned_cost` int(16) NOT NULL,
  `sales_clean_actual_cost` int(16) NOT NULL,
  `sales_clean_contractor` varchar(50) NOT NULL,
  `sales_clean_notes` varchar(300) NOT NULL,
  `sales_clean_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `name`) VALUES
(1, 'Drywall'),
(3, 'Plumbing'),
(4, 'Framing'),
(5, 'Landscape'),
(6, 'Exterior'),
(7, 'Front Yard'),
(8, 'Backyard'),
(9, 'Interior'),
(10, 'Kitchen'),
(11, 'Main Bathroom'),
(12, 'Second Bath'),
(13, 'Master Bedroom'),
(17, 'General Finish'),
(20, 'Flooring');

-- --------------------------------------------------------

--
-- Table structure for table `selling_closing_costs`
--

CREATE TABLE `selling_closing_costs` (
  `id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `category` varchar(15) NOT NULL,
  `description` varchar(250) NOT NULL,
  `cost` int(15) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `stucco`
--

CREATE TABLE `stucco` (
  `stucco_id` int(10) NOT NULL,
  `stucco_planned_start` date NOT NULL,
  `stucco_planned_finish` date NOT NULL,
  `stucco_actual_start` date NOT NULL,
  `stucco_actual_finish` date NOT NULL,
  `stucco_planned_cost` int(16) NOT NULL,
  `stucco_actual_cost` int(16) NOT NULL,
  `stucco_contractor` varchar(50) NOT NULL,
  `stucco_notes` varchar(300) NOT NULL,
  `stucco_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `supervisors`
--

CREATE TABLE `supervisors` (
  `id` int(11) NOT NULL,
  `supervisor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supervisors`
--

INSERT INTO `supervisors` (`id`, `supervisor`) VALUES
(1, 'Supervisor');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(50) NOT NULL,
  `task_units` varchar(10) NOT NULL,
  `default_qty` varchar(16) NOT NULL,
  `task_cost` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`task_id`, `task_name`, `task_units`, `default_qty`, `task_cost`) VALUES
(3, 'Sample', 'SQFT', 'sqft', 2.5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `user_role` tinyint(1) NOT NULL DEFAULT '0',
  `entity` varchar(20) NOT NULL,
  `contractor_type` varchar(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `phone`, `password`, `user_role`, `entity`, `contractor_type`, `created`) VALUES
(1, 'Sample User', 'sample@user.com', '(555) 555-5555', '$2a$10$3e87ff46b5ccbce34ea2cuz2PuwoD99ckLMCDE.hQtGdPtCGdRmE6', 1, '', '', '2017-09-08 20:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_settings`
--

CREATE TABLE `user_settings` (
  `setting_id` int(10) NOT NULL,
  `#` tinyint(1) NOT NULL DEFAULT '1',
  `pid` tinyint(1) NOT NULL DEFAULT '1',
  `phase` tinyint(1) NOT NULL DEFAULT '1',
  `fha` tinyint(1) NOT NULL DEFAULT '1',
  `dsp` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `property_type` tinyint(1) NOT NULL DEFAULT '1',
  `address` tinyint(1) NOT NULL DEFAULT '1',
  `city` tinyint(1) NOT NULL DEFAULT '1',
  `zip` tinyint(1) NOT NULL DEFAULT '1',
  `county` tinyint(1) NOT NULL DEFAULT '1',
  `sqft` tinyint(1) NOT NULL DEFAULT '1',
  `lotsize` tinyint(1) NOT NULL DEFAULT '1',
  `beds` tinyint(1) NOT NULL DEFAULT '1',
  `baths` tinyint(1) NOT NULL DEFAULT '1',
  `year_built` tinyint(1) NOT NULL DEFAULT '1',
  `pool_spa` tinyint(1) NOT NULL DEFAULT '1',
  `occupancy` tinyint(1) NOT NULL DEFAULT '1',
  `est_possession` tinyint(1) NOT NULL DEFAULT '1',
  `lockbox_combo` tinyint(1) NOT NULL DEFAULT '1',
  `alarm_code` tinyint(1) NOT NULL DEFAULT '1',
  `asset_manager` tinyint(1) NOT NULL DEFAULT '1',
  `supervisor` tinyint(1) NOT NULL DEFAULT '1',
  `permits` tinyint(1) NOT NULL DEFAULT '1',
  `est_completion` tinyint(1) NOT NULL DEFAULT '1',
  `purchase_close_date` tinyint(1) NOT NULL DEFAULT '1',
  `lender` tinyint(1) NOT NULL DEFAULT '1',
  `purchase_cost` tinyint(1) NOT NULL DEFAULT '1',
  `rehab_estimate` tinyint(1) NOT NULL DEFAULT '1',
  `arv` tinyint(1) NOT NULL DEFAULT '1',
  `loan_amount` tinyint(1) NOT NULL DEFAULT '1',
  `list_price` tinyint(1) NOT NULL DEFAULT '1',
  `sale_price` tinyint(1) NOT NULL DEFAULT '1',
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `windows`
--

CREATE TABLE `windows` (
  `windows_id` int(10) NOT NULL,
  `windows_planned_start` date NOT NULL,
  `windows_planned_finish` date NOT NULL,
  `windows_actual_start` date NOT NULL,
  `windows_actual_finish` date NOT NULL,
  `windows_planned_cost` int(16) NOT NULL,
  `windows_actual_cost` int(16) NOT NULL,
  `windows_contractor` varchar(50) NOT NULL,
  `windows_notes` varchar(300) NOT NULL,
  `windows_comp_perc` int(5) NOT NULL DEFAULT '0',
  `rehab_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`agent_id`);

--
-- Indexes for table `asset_managers`
--
ALTER TABLE `asset_managers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bath`
--
ALTER TABLE `bath`
  ADD PRIMARY KEY (`bath_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `bid_tasks`
--
ALTER TABLE `bid_tasks`
  ADD PRIMARY KEY (`bid_task_id`),
  ADD KEY `bid_id` (`bid_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `properties_pid` (`properties_pid`),
  ADD KEY `users_uid` (`users_uid`);

--
-- Indexes for table `demo`
--
ALTER TABLE `demo`
  ADD PRIMARY KEY (`demo_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `drywall`
--
ALTER TABLE `drywall`
  ADD PRIMARY KEY (`drywall_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `electrical`
--
ALTER TABLE `electrical`
  ADD PRIMARY KEY (`electrical_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `entity_vesting`
--
ALTER TABLE `entity_vesting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `escrow`
--
ALTER TABLE `escrow`
  ADD PRIMARY KEY (`escrow_id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `escrow_day01`
--
ALTER TABLE `escrow_day01`
  ADD PRIMARY KEY (`id`),
  ADD KEY `escrow_id` (`escrow_id`);

--
-- Indexes for table `escrow_day03`
--
ALTER TABLE `escrow_day03`
  ADD PRIMARY KEY (`id`),
  ADD KEY `escrow_id` (`escrow_id`);

--
-- Indexes for table `escrow_day07`
--
ALTER TABLE `escrow_day07`
  ADD PRIMARY KEY (`id`),
  ADD KEY `escrow_id` (`escrow_id`);

--
-- Indexes for table `escrow_day12`
--
ALTER TABLE `escrow_day12`
  ADD PRIMARY KEY (`id`),
  ADD KEY `escrow_id` (`escrow_id`);

--
-- Indexes for table `escrow_day15`
--
ALTER TABLE `escrow_day15`
  ADD PRIMARY KEY (`id`),
  ADD KEY `escrow_id` (`escrow_id`);

--
-- Indexes for table `escrow_day21`
--
ALTER TABLE `escrow_day21`
  ADD PRIMARY KEY (`id`),
  ADD KEY `escrow_id` (`escrow_id`);

--
-- Indexes for table `escrow_day23`
--
ALTER TABLE `escrow_day23`
  ADD PRIMARY KEY (`id`),
  ADD KEY `escrow_id` (`escrow_id`);

--
-- Indexes for table `escrow_forms`
--
ALTER TABLE `escrow_forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `ext_paint`
--
ALTER TABLE `ext_paint`
  ADD PRIMARY KEY (`ext_paint_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `fixtures`
--
ALTER TABLE `fixtures`
  ADD PRIMARY KEY (`fixtures_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `flooring`
--
ALTER TABLE `flooring`
  ADD PRIMARY KEY (`flooring_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `framing`
--
ALTER TABLE `framing`
  ADD PRIMARY KEY (`framing_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `garage_door`
--
ALTER TABLE `garage_door`
  ADD PRIMARY KEY (`garage_door_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `hardscape`
--
ALTER TABLE `hardscape`
  ADD PRIMARY KEY (`hardscape_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `hvac`
--
ALTER TABLE `hvac`
  ADD PRIMARY KEY (`hvac_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `int_paint`
--
ALTER TABLE `int_paint`
  ADD PRIMARY KEY (`int_paint_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `kitchen`
--
ALTER TABLE `kitchen`
  ADD PRIMARY KEY (`kitchen_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `landscaping`
--
ALTER TABLE `landscaping`
  ADD PRIMARY KEY (`landscaping_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `lenders`
--
ALTER TABLE `lenders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_images`
--
ALTER TABLE `listing_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`offer_id`),
  ADD KEY `offers_ibfk_2` (`agent_id`);

--
-- Indexes for table `open_bids`
--
ALTER TABLE `open_bids`
  ADD PRIMARY KEY (`bid_id`),
  ADD KEY `bid_pid` (`bid_pid`),
  ADD KEY `bid_cat_id` (`bid_cat_id`);

--
-- Indexes for table `plumbing`
--
ALTER TABLE `plumbing`
  ADD PRIMARY KEY (`plumbing_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `pool_spa`
--
ALTER TABLE `pool_spa`
  ADD PRIMARY KEY (`pool_spa_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `proforma`
--
ALTER TABLE `proforma`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `proforma_actual`
--
ALTER TABLE `proforma_actual`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `proforma_defaults`
--
ALTER TABLE `proforma_defaults`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proforma_projected`
--
ALTER TABLE `proforma_projected`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `purchase_closing_costs`
--
ALTER TABLE `purchase_closing_costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `rehabs`
--
ALTER TABLE `rehabs`
  ADD PRIMARY KEY (`rehab_id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `rehab_activity_logs`
--
ALTER TABLE `rehab_activity_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `properties_pid` (`properties_pid`),
  ADD KEY `users_uid` (`users_uid`);

--
-- Indexes for table `roof`
--
ALTER TABLE `roof`
  ADD PRIMARY KEY (`roof_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `sales_clean`
--
ALTER TABLE `sales_clean`
  ADD PRIMARY KEY (`sales_clean_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selling_closing_costs`
--
ALTER TABLE `selling_closing_costs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stucco`
--
ALTER TABLE `stucco`
  ADD PRIMARY KEY (`stucco_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- Indexes for table `supervisors`
--
ALTER TABLE `supervisors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `user_settings`
--
ALTER TABLE `user_settings`
  ADD PRIMARY KEY (`setting_id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `windows`
--
ALTER TABLE `windows`
  ADD PRIMARY KEY (`windows_id`),
  ADD KEY `rehab_id` (`rehab_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `agent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `asset_managers`
--
ALTER TABLE `asset_managers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `bath`
--
ALTER TABLE `bath`
  MODIFY `bath_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `bid_tasks`
--
ALTER TABLE `bid_tasks`
  MODIFY `bid_task_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `demo`
--
ALTER TABLE `demo`
  MODIFY `demo_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `drywall`
--
ALTER TABLE `drywall`
  MODIFY `drywall_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `electrical`
--
ALTER TABLE `electrical`
  MODIFY `electrical_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `entity_vesting`
--
ALTER TABLE `entity_vesting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `escrow`
--
ALTER TABLE `escrow`
  MODIFY `escrow_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `escrow_day01`
--
ALTER TABLE `escrow_day01`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `escrow_day03`
--
ALTER TABLE `escrow_day03`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `escrow_day07`
--
ALTER TABLE `escrow_day07`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `escrow_day12`
--
ALTER TABLE `escrow_day12`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `escrow_day15`
--
ALTER TABLE `escrow_day15`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `escrow_day21`
--
ALTER TABLE `escrow_day21`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `escrow_day23`
--
ALTER TABLE `escrow_day23`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `escrow_forms`
--
ALTER TABLE `escrow_forms`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `ext_paint`
--
ALTER TABLE `ext_paint`
  MODIFY `ext_paint_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `fixtures`
--
ALTER TABLE `fixtures`
  MODIFY `fixtures_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `flooring`
--
ALTER TABLE `flooring`
  MODIFY `flooring_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `framing`
--
ALTER TABLE `framing`
  MODIFY `framing_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `garage_door`
--
ALTER TABLE `garage_door`
  MODIFY `garage_door_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `hardscape`
--
ALTER TABLE `hardscape`
  MODIFY `hardscape_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `hvac`
--
ALTER TABLE `hvac`
  MODIFY `hvac_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `int_paint`
--
ALTER TABLE `int_paint`
  MODIFY `int_paint_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `kitchen`
--
ALTER TABLE `kitchen`
  MODIFY `kitchen_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `landscaping`
--
ALTER TABLE `landscaping`
  MODIFY `landscaping_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `lenders`
--
ALTER TABLE `lenders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `listing_images`
--
ALTER TABLE `listing_images`
  MODIFY `image_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `offer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `open_bids`
--
ALTER TABLE `open_bids`
  MODIFY `bid_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `plumbing`
--
ALTER TABLE `plumbing`
  MODIFY `plumbing_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `pool_spa`
--
ALTER TABLE `pool_spa`
  MODIFY `pool_spa_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `proforma`
--
ALTER TABLE `proforma`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `proforma_actual`
--
ALTER TABLE `proforma_actual`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `proforma_defaults`
--
ALTER TABLE `proforma_defaults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `proforma_projected`
--
ALTER TABLE `proforma_projected`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `purchase_closing_costs`
--
ALTER TABLE `purchase_closing_costs`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `rehabs`
--
ALTER TABLE `rehabs`
  MODIFY `rehab_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `rehab_activity_logs`
--
ALTER TABLE `rehab_activity_logs`
  MODIFY `log_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roof`
--
ALTER TABLE `roof`
  MODIFY `roof_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `sales_clean`
--
ALTER TABLE `sales_clean`
  MODIFY `sales_clean_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `selling_closing_costs`
--
ALTER TABLE `selling_closing_costs`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `stucco`
--
ALTER TABLE `stucco`
  MODIFY `stucco_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `supervisors`
--
ALTER TABLE `supervisors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user_settings`
--
ALTER TABLE `user_settings`
  MODIFY `setting_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `windows`
--
ALTER TABLE `windows`
  MODIFY `windows_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bath`
--
ALTER TABLE `bath`
  ADD CONSTRAINT `bath_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bid_tasks`
--
ALTER TABLE `bid_tasks`
  ADD CONSTRAINT `bid_tasks_ibfk_1` FOREIGN KEY (`bid_id`) REFERENCES `open_bids` (`bid_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`properties_pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`users_uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `demo`
--
ALTER TABLE `demo`
  ADD CONSTRAINT `demo_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `drywall`
--
ALTER TABLE `drywall`
  ADD CONSTRAINT `drywall_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `electrical`
--
ALTER TABLE `electrical`
  ADD CONSTRAINT `electrical_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow`
--
ALTER TABLE `escrow`
  ADD CONSTRAINT `escrow_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow_day01`
--
ALTER TABLE `escrow_day01`
  ADD CONSTRAINT `escrow_day01_ibfk_1` FOREIGN KEY (`escrow_id`) REFERENCES `escrow` (`escrow_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow_day03`
--
ALTER TABLE `escrow_day03`
  ADD CONSTRAINT `escrow_day03_ibfk_1` FOREIGN KEY (`escrow_id`) REFERENCES `escrow` (`escrow_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow_day07`
--
ALTER TABLE `escrow_day07`
  ADD CONSTRAINT `escrow_day07_ibfk_1` FOREIGN KEY (`escrow_id`) REFERENCES `escrow` (`escrow_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow_day12`
--
ALTER TABLE `escrow_day12`
  ADD CONSTRAINT `escrow_day12_ibfk_1` FOREIGN KEY (`escrow_id`) REFERENCES `escrow` (`escrow_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow_day15`
--
ALTER TABLE `escrow_day15`
  ADD CONSTRAINT `escrow_day15_ibfk_1` FOREIGN KEY (`escrow_id`) REFERENCES `escrow` (`escrow_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow_day21`
--
ALTER TABLE `escrow_day21`
  ADD CONSTRAINT `escrow_day21_ibfk_1` FOREIGN KEY (`escrow_id`) REFERENCES `escrow` (`escrow_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow_day23`
--
ALTER TABLE `escrow_day23`
  ADD CONSTRAINT `escrow_day23_ibfk_1` FOREIGN KEY (`escrow_id`) REFERENCES `escrow` (`escrow_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `escrow_forms`
--
ALTER TABLE `escrow_forms`
  ADD CONSTRAINT `escrow_forms_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ext_paint`
--
ALTER TABLE `ext_paint`
  ADD CONSTRAINT `ext_paint_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fixtures`
--
ALTER TABLE `fixtures`
  ADD CONSTRAINT `fixtures_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `flooring`
--
ALTER TABLE `flooring`
  ADD CONSTRAINT `flooring_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `framing`
--
ALTER TABLE `framing`
  ADD CONSTRAINT `framing_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `garage_door`
--
ALTER TABLE `garage_door`
  ADD CONSTRAINT `garage_door_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hardscape`
--
ALTER TABLE `hardscape`
  ADD CONSTRAINT `hardscape_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hvac`
--
ALTER TABLE `hvac`
  ADD CONSTRAINT `hvac_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `int_paint`
--
ALTER TABLE `int_paint`
  ADD CONSTRAINT `int_paint_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kitchen`
--
ALTER TABLE `kitchen`
  ADD CONSTRAINT `kitchen_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `landscaping`
--
ALTER TABLE `landscaping`
  ADD CONSTRAINT `landscaping_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `listing_images`
--
ALTER TABLE `listing_images`
  ADD CONSTRAINT `listing_images_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `offers_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`agent_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `open_bids`
--
ALTER TABLE `open_bids`
  ADD CONSTRAINT `open_bids_ibfk_1` FOREIGN KEY (`bid_pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `open_bids_ibfk_2` FOREIGN KEY (`bid_cat_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plumbing`
--
ALTER TABLE `plumbing`
  ADD CONSTRAINT `plumbing_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pool_spa`
--
ALTER TABLE `pool_spa`
  ADD CONSTRAINT `pool_spa_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proforma`
--
ALTER TABLE `proforma`
  ADD CONSTRAINT `proforma_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proforma_actual`
--
ALTER TABLE `proforma_actual`
  ADD CONSTRAINT `proforma_actual_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proforma_projected`
--
ALTER TABLE `proforma_projected`
  ADD CONSTRAINT `proforma_projected_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchase_closing_costs`
--
ALTER TABLE `purchase_closing_costs`
  ADD CONSTRAINT `purchase_closing_costs_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rehabs`
--
ALTER TABLE `rehabs`
  ADD CONSTRAINT `rehabs_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rehab_activity_logs`
--
ALTER TABLE `rehab_activity_logs`
  ADD CONSTRAINT `rehab_activity_logs_ibfk_1` FOREIGN KEY (`properties_pid`) REFERENCES `properties` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rehab_activity_logs_ibfk_2` FOREIGN KEY (`users_uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `roof`
--
ALTER TABLE `roof`
  ADD CONSTRAINT `roof_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sales_clean`
--
ALTER TABLE `sales_clean`
  ADD CONSTRAINT `sales_clean_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stucco`
--
ALTER TABLE `stucco`
  ADD CONSTRAINT `stucco_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_settings`
--
ALTER TABLE `user_settings`
  ADD CONSTRAINT `user_settings_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `windows`
--
ALTER TABLE `windows`
  ADD CONSTRAINT `windows_ibfk_1` FOREIGN KEY (`rehab_id`) REFERENCES `rehabs` (`rehab_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
