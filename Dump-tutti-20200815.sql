DROP DATABASE IF EXISTS tutti;
CREATE DATABASE IF NOT EXISTS tutti;

USE tutti;

DROP USER IF EXISTS 'apitutti'@'%';
CREATE USER 'apitutti'@'%' IDENTIFIED BY 'Tutti@123';
GRANT ALL PRIVILEGES ON tutti.* TO 'apitutti'@'%';
FLUSH PRIVILEGES;

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `AccessToken`;
CREATE TABLE `AccessToken` (
  `id` varchar(255) NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `scopes` text,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `AccessToken` WRITE;
INSERT INTO `AccessToken` VALUES ('0OPvFJZKAKZkHGkAZnmOyDdnN8TG1RfVPd5cGcI2VD2VblrDvqHfUZVRjpZcJuOA',3600,NULL,'2020-08-10 22:33:31',1),('0pmqVSh7x633ID783GBXc42qRSjNEl4K5RZ4222JI5H1Xh8DlWPwHlSzW3GX11hx',3600,NULL,'2020-08-01 00:07:38',1),('1gCBYleJXFTc9NL7WmgDDUMBRuoqacQISQkooIPrvnIb9FO8Tp9Hb64EA4NCh1r1',3600,NULL,'2020-08-14 02:18:27',1),('1hF8G0dRcU2Aa8fwr3yO0OaMhdOZ0cdXJDNFO1J6RCvguRuvsgA57OddMmUMJgJP',3600,NULL,'2020-08-10 19:51:23',1),('2HB0YRchLwo4KhXJGRop5P8ehm4BBKOAg0Q5wHCorRNU2gNkQaj0WH4p6gYlj6xZ',3600,NULL,'2020-08-01 00:45:28',1),('2SR0DPZQ3Rq8vkJihd8K65hQJfrYB4he5wEp1wqSOzbu1Ol0KdUmvpNhAyQzu0j0',3600,NULL,'2020-08-10 20:13:20',1),('3YJv5GtzpaqGNN7TFMN4CgCq11LwTe6QcAyX0CXgd1MhzaH8AHMiLwoEvBiN5TTd',1209600,NULL,'2020-06-19 19:56:40',1),('42xiAkZiHgDksZfh6BoVwPIrms5qmVRBK5ZLTXn3kk49Bl0FhmSllEY4MJdfkYp5',3600,NULL,'2020-08-10 20:34:59',1),('4iFCoCvW0vuGN1cAtXUtyoHDqQVS3ZAJvNunGj9JQR0BDCdSiy6PFMqxSVpIdjbB',3600,NULL,'2020-08-10 23:29:43',1),('4NKTVWlrmPGABYTw9Bm3TYcOeDvWwODEgiY0qHEH3ESlCaRbWDuG0lPUA14nDq0p',3600,NULL,'2020-08-14 00:32:44',1),('4u2fDLwtEou8sWejeb0AGDml0Rdc12JBfB8pYcFN9DWD9bUQ9mvXapN32jVutJAR',3600,NULL,'2020-08-11 02:03:16',1),('4Ug3ESyz4Pniq6YLHlZzf3eKmGFXWiY4eAnFuGOA9qj0ya7a73y48eM7pdCsTxYT',3600,NULL,'2020-08-01 13:47:15',1),('5pxALDSmoOZDGmno9LYOhPwgFDUF8D3VBeXQisgEEUwoo9yF7ABfyBqPwvEjT3aI',3600,NULL,'2020-07-29 22:17:59',2),('67FceCVcz8wi7ayF24HTpVOvFXsyKLSgi169l5300A3tCwAJKkJFFoVt9MakRaWc',3600,NULL,'2020-07-29 21:12:08',1),('689GehvqgGKPBmpgjS04RfFwWqaoM7VotCDcr3OsUDQG2DnG2cswYplJMKpEKIWJ',3600,NULL,'2020-07-29 21:24:56',2),('6FosXda5QVziq8kj2snFyoPHxYnMRm8cdthKJ1pvL9ZzViccvtaP9jI3yUnwjkc7',3600,NULL,'2020-08-10 20:17:09',1),('6gqwBKSZEiZ4NrZMDkgqobebUyHyAqbNs8oTqoN17rkU7NBvPl6sxBOE5Nrx0Nlp',3600,NULL,'2020-08-10 23:07:40',1),('8GCaDjYfZsLrp8Dy3FSLinf4prso2rSODqRqZjZdQolomttaGgE47HDBJ2JUBV1x',3600,NULL,'2020-08-10 23:28:45',1),('8VNq2H6hfLAFOr2gUlgrOFOvpGGr7e36FlMeV3AKbCk6q7NZg0Yp4TkNG8ICQApL',3600,NULL,'2020-07-31 23:50:12',1),('8WvgkngzbwMDznEANIbGHBu8LZkqfV9QFhznqD4laA7nDNX1cyPbQE660IYKyrWJ',3600,NULL,'2020-07-31 23:54:13',1),('9MDjadydJErnm88yxyQRXD4AUtzbBbTUFwY3NjknfWqAUL56euKx0XE3wXsirTDX',3600,NULL,'2020-08-14 00:06:24',1),('9WqEuBZQmjj9jx7C5ydBSwkfWr7t1xYNpiar3H6gC1zq2xmZklrR1jG0CukeZzGN',3600,NULL,'2020-07-31 23:51:10',1),('ac6tZ4OSti9A7RAtcJoPgwqxj6P9jsgFAcawT29sAPxIqovLC3RhGqlzJvRgMx39',3600,NULL,'2020-08-11 00:21:13',1),('AMsri75DBEFycooZ4KCkGG9wjSEt67kQKvKa04EwGoqvBCfI3XOdeGSkY0vTECY3',3600,NULL,'2020-08-10 21:00:54',2),('Aznh43aHmLG5jEsNcivMfVJfsKFfnecJs9j8u5QMN16ufR7e2DYhJEnIJ0qghbYN',3600,NULL,'2020-08-10 20:55:03',1),('B1pFfLEZFDHUrvUXVQeDYS2LW7W4YSNqtnBjHP9DR4LyT6WToGVI3q1DuDecT771',3600,NULL,'2020-08-01 00:01:50',1),('bEiE8LB8mJf5eHrNrlGSgbgTeM6GH20LpPg0FkidOCPAZQ7QNy4fwDDgQryaoFKE',3600,NULL,'2020-08-10 23:06:07',1),('BhCnaEb6qSdIGSLZJ9NawChunX54QFowNNFdD7sbmXRZI9huJ4UHFYtJD5GhaZpe',3600,NULL,'2020-07-31 23:49:40',1),('BhpFP9gnGXpXLnkJdjczPyDao3HTPlwVQmGLYCRmjAuT05Q1gUsleWSxHUFKY04U',3600,NULL,'2020-08-14 01:38:43',2),('bnc11pmnSVr1fR8yA4VqEdfVX0VHGuKyCay5m7hOGQ08oaQ8P8R1nfABlzevVZ2i',3600,NULL,'2020-08-14 00:01:14',1),('BSBYadvZrIVnzp9cdSi6drLJ2DBp3AVRkbmXQpSBLfuUmxjhPC12x1ZqynMfQs8c',3600,NULL,'2020-08-11 01:03:20',1),('btHU0srq7vSLS3wJTOi6LwjUS3sX8zUsjKLEE4yc7FrfjB7EHjcDXYP0RfD29FRC',3600,NULL,'2020-08-10 20:13:18',1),('C2uVfTAPZ0C68BPlk2rcBV7mcO7MePunZCE3XrRuyKlaBtQRQjWBcbDk8BHkONjX',3600,NULL,'2020-08-14 00:35:11',1),('CdqbNJCkdPZ0BNXZc1N0uKBqiWLp1mJ3F07YjQm50BuMNCyrdC4ZVo8tNbWQhS6B',3600,NULL,'2020-07-31 23:50:22',1),('cEDNz2KSIznQ3d2CXWiTeO7p2TcohuoxkC5v8BT5FIJL11nrgjCOBOdOPUlczTtD',3600,NULL,'2020-08-14 00:54:39',1),('cGE1Qc9P3MDz1b7xpzoD21iaoKcSMe4g6daW0PN7FvQTeNtW56Le4d6J1kqbBibt',3600,NULL,'2020-07-13 02:09:26',1),('ChpcZdqaGVHFtHcCseT69zTIuDUkzFPhvGscDuD6mc81zJjwXIhNRA5RFMQiljen',3600,NULL,'2020-08-01 00:02:47',1),('COUMJ9AYBnp9jaF22ktlImtSFxF0qFWnAjoNJr0kfkKTlEENxveehoIP9Jxuu4iO',3600,NULL,'2020-08-13 23:38:10',1),('CZayNjZa9yeOvFK2RW85BBrHMVzk85ZzTJ8YDQEW4uS69KgXqqFSYejEzGK1CB30',3600,NULL,'2020-08-11 01:18:54',1),('D0BGqkQG4JmFIboxZp4TIOQoazc4QHHZOoh7VQEv5FSrKm0DWUU8ZFF3ybxo0A9L',3600,NULL,'2020-08-10 23:57:37',1),('D7j3qlmRdpNUjqFBb27yOwyPqIB7mCPVt1Z0GyRff4pxqNlhVATeQy55FLmQJAuL',3600,NULL,'2020-08-11 01:44:05',1),('DfNZJ8pBm8Dh5tULNh2R3IUctkvHA3FthjMiuzXeFcgO5wyObLhKYlA6XKizPbLX',3600,NULL,'2020-08-14 02:04:29',1),('dJXRFVJjnNZ5aa3ajt9a8zqaFEvVpZOh3gEFhOF7s6mBYCLr1JPx6A7fv7TJGziz',3600,NULL,'2020-07-29 22:04:25',2),('DKoLUu2vdGUWonZ0jxLUHwuVh7bqjHztxNO8qDzSZ12Ga5KvrP4g14NZ1TmhbfyD',3600,NULL,'2020-08-11 01:35:09',1),('dzgwYAAxQUF52clRVuVsR12aj2otq0uX9uYd6lLdHXNSyz5iRBIGnoOHrOnWB9WX',3600,NULL,'2020-08-10 22:30:36',1),('e0nlSdyPPIx0BEl2hOwAfOhs7BdTrXstS4DrIKq3sCDhfOjIyvufSDeH25qEyHPQ',3600,NULL,'2020-08-11 01:12:35',1),('EgVpHi4gNl6NCApGXBRBYteqWHsxQ0Wft2dOvCQVOe7JIWgCBsAFcdDdUIW8K3OF',3600,NULL,'2020-08-14 00:56:46',1),('EMPBB2H2yvsXlwd11EZQNlPO2b4G7sP6RHHQT92gOkW4ahksnafyIO4djTpHgTKX',3600,NULL,'2020-08-10 22:34:42',1),('exMKOpDHPW0F3DPmNZZ6BBzH3JF9CStpDDslwuxda0SH64ei4urVTaFce1lo7JaL',3600,NULL,'2020-08-01 01:21:04',1),('f7bzAZGOYtBVG1fjSqXChDleUhW1A7JmabAmMP0708NFgyQMkaVVegHg8AG4gyFz',3600,NULL,'2020-07-29 21:55:15',2),('FiTEylCq5ZfWHT0mfBdeBrJLS8LS8I4WQEsoLMaAzIcqhgEA6BHYoAbSagpo6uUg',3600,NULL,'2020-08-01 00:30:56',1),('FO4joI9V6WDJixmlqIINfxvp2Z2h9NScgWD527nCgKTQiJZ6NbXmEPFe14FFzb50',3600,NULL,'2020-08-11 01:06:46',1),('fsFCgn86H7nEk29DmcfGuTak0VfbjPezFpHp713Nz0vJYNrlhrJdmclkzwn0asmD',3600,NULL,'2020-07-29 22:27:53',1),('G6ydmhw2qEbuM1RNQtIRR03dOuYRLECTVAg26ppIXQWxZZK4At8LEppfjHYQBhIL',3600,NULL,'2020-08-14 01:10:27',1),('gbfyQWrjYyhimk9pyuLGJaof5Q0n3EUSYTSGE8brCSGaGygttwApqvP1rGBd1XDX',3600,NULL,'2020-08-14 00:09:14',1),('GFMgSNSYx5QIPKDxL1DoWvX3QOvpgvGTBg7YV4UNeb9jIEv6AXBbepuSiB6gwaM8',3600,NULL,'2020-08-14 01:22:25',1),('GstRjYA0zF4lyuI3PIWjv2oCJZNPjoNrV5XxQEYDhYXujBTaKB8LR0RIOrtFfBIG',3600,NULL,'2020-08-10 22:58:04',1),('GSX2QDquz46iEOHVRssCblLw35vpU38yIxxfhLKOfvESSA9bWp7HcnjEnSjoLHNu',3600,NULL,'2020-08-10 20:35:10',1),('H7tjRBkcTVUGxiKt9VkwVRZOjWqK6JWhZeqeDAsdgGERpSECmdEp2wYOZss8ETNB',3600,NULL,'2020-08-01 01:42:03',1),('HCnyMdW4Uni3pQXuwC7DvFAX5zq2BEO3hkJ7b4foNoAu5T14B9G0Y1Jludbd4HeG',3600,NULL,'2020-08-10 22:48:45',1),('hLxq9noCg2NIsDzrxqeEH2Yw541OUDzEyiJ6bBg2DMKIVy3N5Inl76DS4HvjPDOI',3600,NULL,'2020-08-01 01:12:37',1),('HtmrxC14DwvA4VOfZylPWx9t7sBoJuKxkeZFQ6cZvD3XEcOPyvZW3qkSNztwF1iS',3600,NULL,'2020-08-10 20:22:46',1),('I9MNpyFqCrQLOYS9cvajmlkCb87URPXhX1aPFdOSB3VG0LmYtjbKkExdYK2APXyx',3600,NULL,'2020-08-10 22:25:40',1),('iAgJxnjXWrB8HQC6wTOQWC4f8HIoRqhF18licz5LvcLYD7DySzAUiEjRc5oujSuU',3600,NULL,'2020-08-14 00:00:51',1),('In3wS8FDMhxu7ZyUa73ebs4cPYQA6q25ClvZ0HN8RyBzjOVQNv4HLQ6UIjeiWMTD',3600,NULL,'2020-08-01 00:22:09',1),('ipMuGOH1puxIgdWJtuz49otNHVzcv3OEDBHWpvVTeTwuYRIQlzhbe0GWB3bBlNdi',3600,NULL,'2020-08-11 00:22:35',1),('it0wuYcwGSAZHfhYw5fRGObWGl0j4XS0jgJ3aT96JNNgKPablWyCOtKSa8nlPIFU',3600,NULL,'2020-08-10 20:11:17',1),('IYjtOJl7IERji5GJqTbGbEysbxEZxL2bsvdZ9i9uL2iF0UsgxbwtT20MvTOzCwxa',3600,NULL,'2020-08-14 00:31:29',1),('J62A4BAWFLER3gLtWv7Yfj5uLyXkPhemDjHq0UjoFNjYFknxA7BJ7jOt0h64826n',3600,NULL,'2020-08-10 23:33:07',2),('j6GEZK0kQGsREMPsUFh91iTwG9nFGmYBg3Fo40epVbmhdrNnVYglGHXtP3T59dLd',3600,NULL,'2020-08-10 22:32:50',1),('J8I8cBGiosiLGj0OjR1RENnnAz0MmOrYpFItYtsphaiDBx0Sgj2RhSExUih7teSF',3600,NULL,'2020-08-10 20:39:25',1),('jaYR1ochllEVDR1krOnJUmOV2l20QzjZMLyIHnyPkBZCEEigAJxwbTg4UP4Ga6z0',3600,NULL,'2020-08-01 03:10:29',1),('JRNDYI8GDoByrw5mx1EWOwsdjevGOyVoUFqHDyjA3UkOrKceyIomWNM9bOpAiDEx',3600,NULL,'2020-08-10 20:07:27',1),('JuDGCK8P6T8vndSAAY6SYxAMaFXN4faxWDfonoGsfVSX6clpuKQnf9Q8AzwDb11K',3600,NULL,'2020-07-29 01:47:22',1),('KD0lYMMcQNbzCX5ApbMMZLZNFWGw7DnlE0FFmQlSwiJK3VqMeKSNeNBeWz0u8hdh',3600,NULL,'2020-07-29 21:16:08',2),('Kdu7RgdRR7BkwjwmbCLh1AYhhAamCFkumMLHFQ716xANVwysxr8DHi0Ybma4YQgB',3600,NULL,'2020-08-10 22:52:54',1),('ktbdb4VuO4mA6uaZKGyPLrODxGAT9mrpphm7eX6o46kwUTQ0zDUn8yoWiDAcxkO5',3600,NULL,'2020-08-10 22:48:44',1),('ktvnQxBBTbEKpHzc7rP0yJumeWhgX0uZFAUwvO4WZmK0mRkG8oPu29zFQW7ODu9o',3600,NULL,'2020-08-10 23:03:08',1),('L45wXSEobG5pNTEdu40GcKr8nioEfUNFkKYoDNWvkC75QL24Ol8gwWQOPi0ejiUJ',3600,NULL,'2020-08-10 20:32:42',1),('L9cHQ5jv7uD5oco6VkDEQ3JRrKtoyKrI4CtOwBUVX797IdZSCmvrNCEyNvtK1q4T',3600,NULL,'2020-08-11 01:24:09',1),('ljHlumuyiqlk5c6TGurIEq6pF2hmAaQFJJeCsbp4U9j9fhdp8rHJVsFafOyZZsuz',3600,NULL,'2020-08-01 00:20:31',1),('Lkt27tuuOvVsztAZFZtUdTuIUVSznXc659Z5IYH8eBfEDVHmBwxWGbtj5qFlcfHI',3600,NULL,'2020-07-29 21:14:10',1),('lxVDRtTxkPyAKbF5KvON5Jv87sqcQREFu2SoxuhE0vSeDeGZcHsYi8SjUnMlaEvy',3600,NULL,'2020-08-10 19:45:56',1),('ly6mPiSTAYICskGKEalY4rZKGHEUnmgfIPDdDiiuheVGiCUBlBxSZIhv58DjfEFv',3600,NULL,'2020-08-10 20:07:56',1),('MG43DfKaFS7qeQZlaJS7zrqE2zEcgHzM9NtxoqaCvSZZoFBYtdkuaolnO5ldHmAp',3600,NULL,'2020-08-11 00:26:51',1),('mhFJKGC7USixEs7DFAVhGv1mw5p5s3pDekqmYdtV2DBRY1mDHXH7sdBgOyPGQKwK',3600,NULL,'2020-07-29 21:07:29',1),('n8H43wkbmKtAfksPc7z1nwehJVLtiXG1NXQAmpw9KVVHcsPCB1oCueyI4V8EsrnT',3600,NULL,'2020-08-11 01:29:18',1),('NCJ1CClTOOsR5xXakPlIr1Zadg8mW98cslUh90TwacgxMOTC1QcRiBGWAwvZGE3t',3600,NULL,'2020-08-01 01:06:22',1),('Nr7ffO7k9oZlnw9RaFAJpsoTcPV1J2Ksap14Tnl2lGsJhVW0Ao07QGWgviM1nhW6',3600,NULL,'2020-07-29 21:59:09',2),('NxtfE6cojibJqW2h7crIxntZNHZSZIrHf5r5nHiKZ6Sk7KQBSpPH0pgzd4Maslyh',3600,NULL,'2020-08-14 00:08:12',1),('oKQFwqLOwUj21vfFOiik0obF3QCg568sBtn14fFwITzbuJs2ZsVC9WX7bUjZcJG7',3600,NULL,'2020-08-15 02:39:10',24),('OvInrO0oKgjwnRCGzU3QlQqZt3Qm8ZHpEUrocKq8FswgExCzwlAvsqqrGoNyYNQF',3600,NULL,'2020-08-01 00:09:21',1),('P2V78bokEKEifnp65wU26wPpiDC2yEoZ4t4lHtAygLHNF0AfE0WaPDNWIoYpm6nD',3600,NULL,'2020-08-14 00:11:54',1),('P8bnT08MuCACLfYGxqLMfY0kUzwETsdLuN7GLCRR6Y8Bu49ytQQmMuK3OMF8NH9D',3600,NULL,'2020-08-14 00:00:51',1),('pA7gkb8fOPY1vbcgZDaHIyxNueEgRqjDHrgDPBX4hoF2JDN6wxgww5IVzyM2x4TB',3600,NULL,'2020-08-11 01:18:20',1),('pb6IEolPWW74WTEKY5XAUElqCDlLoDhaOMguQhSyGKOcQPlGCxcddq3puoyCReJj',3600,NULL,'2020-07-29 21:09:15',1),('pd7ccG3BkSHaSd5omvE6qOYlmFvJPnlMsaHA9j9GGEEKBG3YtiiQI7QgtTocVTgc',3600,NULL,'2020-08-10 23:01:36',1),('pha3bEexWKUU1IV5DKVBjaowUQsWaHgDp008FFkUUxpXAT2Gwm95i30d9mBzhiCV',3600,NULL,'2020-08-10 20:38:24',1),('pisjlAtNrVbfYCCr67xWNyuMJGtReOJj2WtjhoG9Mh8zAvASIjzHIQGtuiWA1ifw',3600,NULL,'2020-08-14 01:19:55',1),('PJIlwE6iYymyPJKDDTZjPdmVex41jMmfSaEtBVVEEKWVIa9UvkvXT9WhuAULRRWp',3600,NULL,'2020-07-29 22:16:37',2),('puq1T8YaptknlSMhaXmi8kGIBthzmvpsaMREq7CV9PwpuFsfOPKSzhIyCTZSmmXt',3600,NULL,'2020-08-01 01:27:41',1),('pvEAV9xAr31fHCLWWJ2MYGE6UHWuwgDiB47jz1sUT4NNO3fzOIfSrDIVbDJPAuar',3600,NULL,'2020-07-03 01:26:44',1),('pzAdiM1HzkHleD5hAuYhjgfxj0iL4R4h1Hh2mYXrV3K853bTUIRp67ZaMGlT1OBg',3600,NULL,'2020-08-10 23:21:10',1),('Q6ETPlLQZ3mEeD46HY84ap1thSaHilYlNG0e3PrDcXzC7Ta0k4f910Paa9ff3QaH',3600,NULL,'2020-08-10 20:48:53',1),('qdaHxsTzLpRzs2HSAYFsO4nR6hL3r2b7uWGuDDN1wjReca5E9uvG3uBYmMNmdtEY',3600,NULL,'2020-08-10 21:03:51',2),('RvZbeKtoFRnzVfBPMJYGibEtzuvqEnw9SAtTnR9MXqAhzuCtSwXIrJpLIqMLt1aM',3600,NULL,'2020-08-11 01:30:25',1),('Sb5CCVA6vDv79J7rTJyxNPMGLTqdpebuMtcbGxxw1cQgKPTRpM41HFi1ke6KXplq',3600,NULL,'2020-08-10 23:03:59',1),('sEbSHrG4MWkPz8uOYsDUj7lPhDjC8Y6HwwFJJhxay1gxJELmoAmiWNptACyYDDeF',3600,NULL,'2020-08-01 01:31:05',1),('sFs1wC80TSCYs2f3LVf5vpzT1YsR3ewYsIBe6ZGxPmJibwQReaIH0jfCgF6NxBF3',3600,NULL,'2020-08-10 20:18:22',1),('SjtmZEu3EmtTflpW1JC3k47tZPvX2h7V5VhfXVVh2lPat1CqzQhOS2xk5UsfDqG1',3600,NULL,'2020-07-29 22:20:11',2),('stmTFMsHF2ucibpBA9eYlJnpByuEDZBW1o2eFVoy92Ea5VjVNHU85AEIE08LFEXD',3600,NULL,'2020-08-14 00:35:58',1),('sUkxEkRQ3Zh3Nv2MwE9wYOBu4KBuqBFyL4FVnbxY9H8By2xNpLEprLyRHeFfUHpe',3600,NULL,'2020-08-11 01:51:32',1),('SxJPuJbuzCZepjxmwe52OaKcYTgzrqyFvqvwjRdCwEv8jC6D696kjy3ajJxS8PNb',3600,NULL,'2020-07-29 22:25:41',2),('tAfxnWHHbTQsueRbATjCo84ECLpeC2rypIsSCQ8ivksWU1zeBcCVRTVoiuOsxm3N',3600,NULL,'2020-08-14 01:12:27',1),('TmbOOTPfna7QbWbXBYEl2t5ysky8QgdBsAW4Gyj4rsvQCFcjwKqqxGQBZov7r3hF',3600,NULL,'2020-07-31 23:51:54',1),('ToZhuW5LJEDcF9ImXHbav5jtsKR3S2osAMPLGkXuOKPq8DMMAXk4SNp2dNHGwurj',3600,NULL,'2020-07-29 21:21:03',2),('TqZj0SeAxi1i87HUP1HINtleC9I0T5HKEPdl3BMWOmRgaaTqwnXOnjvF8xsS4VgG',3600,NULL,'2020-08-10 20:09:09',1),('tYJLlnziv5FDT1UTQVzRtIT1g982LOWOjACNEoLDGkslUR7RLM7tF8gh7BUHZRGM',3600,NULL,'2020-08-01 00:15:17',1),('TzDBidI6nXxGnZTmyvEM5ub7UOAFjjIxh1ZMHDVIhu38iBZHpUpyg3Ui4dOuhsax',3600,NULL,'2020-08-11 01:45:57',1),('TZdVQKjGvKHTdJfbS7gIv1lDD1DOnQFipGuTrVC1bCR1RR4QDRBSbZm8qvCFV2bh',3600,NULL,'2020-08-14 01:24:06',1),('vLyEdyib7BO4qQgkgP8ZuoOXnpzzEO9TChEQ8BLVDuqEp4XZf53ZFcyAwewIEsiM',3600,NULL,'2020-07-29 22:31:39',2),('VqIjw6TlDXPozDkcwk9S6pBy1GMvEufOxQirhVJGD3iLbzsiJPgT1Bw3BhjJpDHQ',3600,NULL,'2020-08-10 21:01:56',2),('vvhfUqfBgwbhG5ueyEww7cyN3mw74GUkaAdayWRac28ZP2Z4FUXLE5EFImew3bZP',3600,NULL,'2020-08-10 22:56:15',1),('vwReiGuKfuWpBI1vuSVsDwMLR4fgfTuGkHlaGBBCxwXbu6esKtZYLGaTAuZGkBnI',3600,NULL,'2020-08-10 20:18:27',1),('W3EHUrkRODPmIQ64XvamEvI3ghsM4AaS9ln11MOE9VsHjFoWHIWFoQf8WqVeGy7O',3600,NULL,'2020-08-10 20:58:01',2),('WS1Qk9aZo8YDWz2HxPowaqvzOd9BLMEVGmHiQHgaQsyuLt26fRvXQdH842Gnk6Q6',1209600,NULL,'2020-06-19 19:52:51',1),('wS7Ykrtbx5VeGpyQWAN38jU330Ss5XrgYG1fKbRKDSYwDEjSRpsNlQAuFWcDaFzi',3600,NULL,'2020-08-10 19:50:16',1),('wVfQ8H7wBKm2fKz6EqpxbK3G71vnAgCgmEISKeoRRWs28f9YOauExYMLQc5EOmkC',3600,NULL,'2020-08-01 01:06:13',1),('wVVlo8CVAsrGETFg3KbvJB7hGooOCIBVBP5eIAGjo0UWPZPKHqYsCCrDEPua7FY0',3600,NULL,'2020-08-10 23:53:28',1),('wYnwGNMXtxkgtcgI4CcKclA8xaFLKHqABpqs1ZXLpVltndKITEFOlJYfxJbCh63K',3600,NULL,'2020-08-01 01:09:56',1),('xd95rBtHJeIErEzccftAH0lDPwtxbHD3xzm8vsPJj0hfpI0XCOHzW3bxRj7F1Sii',3600,NULL,'2020-08-11 01:49:28',1),('xjcaxkzVFYsGh3FLlvrUyZMYlCJMgPi0pirP1RaFrDcHAdnf0aFhc6WAtoPmTtSl',3600,NULL,'2020-07-29 22:01:33',2),('XLhR4rJzScQU9C9E3FWLPzIFgCQUaJ4NFAAkc2fe0vUg3bQjZd1hjFZexWfCYPIN',3600,NULL,'2020-08-11 01:00:31',1),('XxIylGaUL8kx3zDuxpzN3ojKsRkgCeVlAwbqlACzWJ2JNFMwLgNj8XDHd4SvF5Tw',3600,NULL,'2020-08-10 23:11:38',1),('Xy53WsPGDuT6Kd0YqZOGOsH3PftnqTayrrv2h9rLa6gOaHFI4BCw51t97EpQsZ73',3600,NULL,'2020-07-29 22:26:55',2),('YAVSsicS02tgZRTrIAGiZGtr13BzwMzTgyVlMBqeXlZQHz0Xi5LXltj3JdWIeSWP',3600,NULL,'2020-08-14 00:08:53',1),('yi7gYhzlFzMRMw7HeVvU4lZP7QNjV4wX3RFLRVkVc5oVdHnXCqhdSaUkHiqY3YNW',3600,NULL,'2020-08-14 22:22:17',1),('ylFBkiVtQeqHub7simcquV0hh27g1sldNVIGwi36OeP2WnuAtOQ8lWnyEkuDwwW8',3600,NULL,'2020-08-11 01:47:46',1),('YVE0yffLFCkzCX1mIw19L6eBuHB8GXSpMPJ2Hp58SGAH7JlZYkdKdlRzlR2K6zmZ',3600,NULL,'2020-08-01 00:18:39',1),('Z5SPn6Dg0qb8WTQxG1HiPYqGLynEBtAnlSdJQ9ZnXdewvhrxJlqIy1v5QzIeTOPm',3600,NULL,'2020-07-31 23:49:59',1),('ZdEOCF1zm5GQLYPIpgR9UnxYYMvIDp4NPbArVI1jLD4VbILp9zBv4CFVahXLJrBn',3600,NULL,'2020-08-10 22:30:59',1),('zMcgAFxy3TnnnohJQSt99mM1X5cdnnANXBG2Uk1hivAiXy1BmX64D5J8spvkQjBS',3600,NULL,'2020-07-29 21:15:06',1),('ZT7oreYupxnnAQj89UxPrfZeh4PCZRxUy6bViSD8yiaXu3lmmOas88ELgR5JHmaH',3600,NULL,'2020-08-10 19:49:16',1),('zTtZ2g1geCc4tCbHdHy0PFs1ZGf1Ly6R9ASC9u5RPE30or1NtIfF4OzLsbDQGqPG',3600,NULL,'2020-08-13 23:42:59',1),('zxcgyajpkqDGfSZXC6c5OEljGY1JsEkB7r6psdSY9cQxGNIZseETeBVSc2Y50WWD',3600,NULL,'2020-08-11 00:25:17',1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `ACL`;
CREATE TABLE `ACL` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(512) DEFAULT NULL,
  `property` varchar(512) DEFAULT NULL,
  `accessType` varchar(512) DEFAULT NULL,
  `permission` varchar(512) DEFAULT NULL,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `ACL` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `Combos`;
CREATE TABLE `Combos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `brand` varchar(512) NOT NULL,
  `typeFood` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Combos` WRITE;
INSERT INTO `Combos` VALUES (1,'Combo pickles 1',10,10,'Combo pickles 1',1,'',NULL),(2,'Combo aceitunas 1',10,10,'Combo aceitunas 1',1,'',NULL),(3,'Combo aceitunas 1',10,10,'Combo aceitunas 1',1,'',NULL),(4,'Combo aceitunas 1',10,10,'Combo aceitunas 1',1,'',NULL),(5,'Combo aceitunas 1',10,10,'Combo aceitunas 1',1,'',NULL),(6,'Combo aceitunas 1',10,10,'Combo aceitunas 1',1,'',NULL);
UNLOCK TABLES;

DROP TABLE IF EXISTS `CombosForProjects`;
CREATE TABLE `CombosForProjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) DEFAULT NULL,
  `brand` varchar(512) DEFAULT NULL,
  `typeFood` varchar(512) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `comboId` int(11) DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CombosForProjectFK` (`comboId`),
  KEY `ProjectCombosFK` (`projectId`),
  CONSTRAINT `CombosForProjectFK` FOREIGN KEY (`comboId`) REFERENCES `Combos` (`id`),
  CONSTRAINT `ProjectCombosFK` FOREIGN KEY (`projectId`) REFERENCES `Projects` (`id`)
) ENGINE=InnoDB;

LOCK TABLES `CombosForProjects` WRITE;
INSERT INTO `CombosForProjects` VALUES (1,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(2,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(3,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(4,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(5,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(6,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(7,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(8,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(9,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(10,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(11,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(12,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(13,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(14,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(15,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(16,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(17,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(18,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,2,NULL),(19,'Combo pickles 1','',NULL,10,'Combo pickles 1',1,1,NULL),(20,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,5,NULL),(21,'Combo aceitunas 1','',NULL,10,'Combo aceitunas 1',1,3,NULL);
UNLOCK TABLES;

DROP TABLE IF EXISTS `Contacts`;
CREATE TABLE `Contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameContact` varchar(512) NOT NULL,
  `typeContact` enum('EMAIL','TEL') NOT NULL,
  `valueContact` varchar(512) NOT NULL,
  `userFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ContactUsersFK` (`userFk`),
  CONSTRAINT `ContactUsersFK` FOREIGN KEY (`userFk`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Contacts` WRITE;
INSERT INTO `Contacts` VALUES (1,'type string','EMAIL','levicastro36@gmail.com',NULL),(2,'type string','TEL','3516123456',NULL),(3,'type string','EMAIL','levi@gmail.com',NULL),(4,'institucion','TEL','351630060',4),(5,'dsadsad','EMAIL','santiab@gmail.com',20),(6,'dsadsad','TEL','3513249117',20),(7,'Santiago','EMAIL','sanuel12354@gmail.com',21),(8,'Santiago','TEL','351648941',21);
UNLOCK TABLES;

DROP TABLE IF EXISTS `ContactsToContacts`;
CREATE TABLE `ContactsToContacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contactedStatus` enum('PENDING_SEND','SENDED','PENDING_ANSWER','ANSWERED') DEFAULT NULL,
  `contactId` int(11) DEFAULT NULL,
  `toContactId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cc_contactId` (`contactId`),
  KEY `fk_cc_toContactId` (`toContactId`),
  CONSTRAINT `fk_cc_contactId` FOREIGN KEY (`contactId`) REFERENCES `Contacts` (`id`),
  CONSTRAINT `fk_cc_toContactId` FOREIGN KEY (`toContactId`) REFERENCES `ToContacts` (`id`)
) ENGINE=InnoDB;

LOCK TABLES `ContactsToContacts` WRITE;
INSERT INTO `ContactsToContacts` VALUES (1,'SENDED',1,1),(2,'PENDING_SEND',2,1),(3,'SENDED',3,2),(4,'PENDING_SEND',2,2);
UNLOCK TABLES;

DROP TABLE IF EXISTS `Files`;
CREATE TABLE `Files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `originalName` varchar(512) DEFAULT NULL,
  `name` varchar(512) NOT NULL,
  `type` varchar(512) NOT NULL,
  `container` varchar(512) NOT NULL,
  `size` int(11) DEFAULT NULL,
  `urlBase` varchar(512) NOT NULL,
  `url` varchar(512) NOT NULL,
  `dateUpload` datetime DEFAULT NULL,
  `principal` tinyint(1) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `comboFK` int(11) DEFAULT NULL,
  `historyFK` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FilesCombosFK` (`comboFK`),
  KEY `FilesHistoriesFK` (`historyFK`),
  CONSTRAINT `FilesCombosFK` FOREIGN KEY (`comboFK`) REFERENCES `Combos` (`id`),
  CONSTRAINT `FilesHistoriesFK` FOREIGN KEY (`historyFK`) REFERENCES `Histories` (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Files` WRITE;
INSERT INTO `Files` VALUES (1,'header 1.png','header%201.png','image/png','tutti-multimedia',5652338,'https://storage.cloud.google.com','https://storage.cloud.google.com/tutti-multimedia/header%201.png','2020-05-21 23:50:54',0,'prueba 1',2,NULL),(2,'destacados 1.png','destacados%201.png','image/png','tutti-multimedia',8671316,'https://storage.cloud.google.com','https://storage.cloud.google.com/tutti-multimedia/destacados%201.png','2020-05-21 23:50:54',0,'prueba 2',1,NULL),(3,'Web 1920 – 4@2x.png','Web%201920%20%E2%80%93%204@2x.png','image/png','tutti-multimedia',1099858,'https://storage.cloud.google.com','https://storage.cloud.google.com/tutti-multimedia/Web%201920%20%E2%80%93%204@2x.png','2020-05-21 23:50:54',0,'prueba 3',NULL,NULL),(4,'Web 1920 – 4.png','Web%201920%20%E2%80%93%204.png','image/png','tutti-multimedia',325669,'https://storage.cloud.google.com','https://storage.cloud.google.com/tutti-multimedia/Web%201920%20%E2%80%93%204.png','2020-05-21 23:50:54',0,'prueba 4',NULL,NULL),(5,'Estilo Logo-05.png','Estilo%20Logo-05.png','image/png','tutti-multimedia',41496,'https://storage.cloud.google.com','https://storage.cloud.google.com/tutti-multimedia/Estilo%20Logo-05.png','2020-05-21 23:50:54',0,'prueba 5',NULL,1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `Histories`;
CREATE TABLE `Histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `title` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `text` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Histories` WRITE;
INSERT INTO `Histories` VALUES (1,'Viaje Tanti','Una mano para la comunidad','Viajamos a tanti','Viajamos a tanti para ver a su cominudad y crear una coneccion con nuestro proyecto solidario.');
UNLOCK TABLES;

DROP TABLE IF EXISTS `OrderDetails`;
CREATE TABLE `OrderDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderDetailFK` (`orderId`),
  CONSTRAINT `OrderDetailFK` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`)
) ENGINE=InnoDB;

LOCK TABLES `OrderDetails` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `projectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProjectFK` (`projectId`),
  CONSTRAINT `ProjectFK` FOREIGN KEY (`projectId`) REFERENCES `Projects` (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Orders` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `ProjectDetails`;
CREATE TABLE `ProjectDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreate` datetime DEFAULT NULL,
  `dateModified` datetime DEFAULT NULL,
  `seller` int(11) NOT NULL,
  `projectId` int(11) DEFAULT NULL,
  `subTotal` float NOT NULL,
  `sellerName` varchar(512) DEFAULT NULL,
  `comboProjectId` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProjectDetailFK` (`projectId`),
  KEY `ComboProjectDetailFK` (`comboProjectId`),
  CONSTRAINT `ComboProjectDetailFK` FOREIGN KEY (`comboProjectId`) REFERENCES `CombosForProjects` (`id`),
  CONSTRAINT `ProjectDetailFK` FOREIGN KEY (`projectId`) REFERENCES `Projects` (`id`)
) ENGINE=InnoDB;

LOCK TABLES `ProjectDetails` WRITE;
INSERT INTO `ProjectDetails` VALUES (1,'2020-07-13 00:23:40','2020-07-13 00:23:40',1,1,0,'cliente',1,0),(2,'2020-08-13 13:31:11','2020-08-13 13:31:11',2,1,10,'cliente',2,2),(3,'2020-08-13 14:01:11','2020-08-13 14:01:11',1,1,10,'cliente',1,1),(4,'2020-08-13 14:01:11','2020-08-13 14:01:11',1,1,20,'cliente',2,2),(5,'2020-08-13 14:04:44','2020-08-13 14:04:44',2,1,10,'cliente',1,1),(6,'2020-08-13 14:04:44','2020-08-13 14:04:44',2,1,20,'cliente',2,2),(7,'2020-08-14 10:26:00','2020-08-14 10:26:00',2,1,10,'cliente',1,1),(8,'2020-08-14 10:26:00','2020-08-14 10:26:00',2,1,10,'cliente',2,1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `Projects`;
CREATE TABLE `Projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreate` datetime DEFAULT NULL,
  `dateModified` datetime DEFAULT NULL,
  `name` varchar(512) DEFAULT NULL,
  `objective` varchar(512) DEFAULT NULL,
  `nameSellers` text,
  `sellers` text,
  `userClientId` int(11) DEFAULT NULL,
  `userProjectId` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `typeProject` enum('COLECTIVO','INDIVIDUAL') DEFAULT NULL,
  `dateToClose` datetime DEFAULT NULL,
  `dateLimit` datetime DEFAULT NULL,
  `placeOfDelivery` varchar(512) DEFAULT NULL,
  `userInstId` int(11) DEFAULT NULL,
  `userCollaboratorId` int(11) DEFAULT NULL,
  `finaly` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userClientIdFK` (`userClientId`),
  KEY `userProjectIdFK` (`userProjectId`),
  KEY `userInstIdFK` (`userInstId`),
  KEY `userCollaboratorIdFK` (`userCollaboratorId`),
  CONSTRAINT `userClientIdFK` FOREIGN KEY (`userClientId`) REFERENCES `Users` (`id`),
  CONSTRAINT `userCollaboratorIdFK` FOREIGN KEY (`userCollaboratorId`) REFERENCES `Users` (`id`),
  CONSTRAINT `userInstIdFK` FOREIGN KEY (`userInstId`) REFERENCES `Users` (`id`),
  CONSTRAINT `userProjectIdFK` FOREIGN KEY (`userProjectId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Projects` WRITE;
INSERT INTO `Projects` VALUES (1,'2020-07-13 00:20:52','2020-07-13 00:20:52','string','0','[\"pedro\",\"juan\"]','[{\"id\":1,\"name\":\"pedro\"},{\"id\":2,\"name\":\"juan\"}]',2,1,0,'COLECTIVO',NULL,NULL,NULL,NULL,NULL,NULL),(2,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,6,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(3,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,7,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(4,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,8,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(5,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,9,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(6,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,10,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(7,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,11,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(8,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,12,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(9,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,13,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(10,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,14,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(11,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,15,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(12,'2020-08-01 03:00:00','2020-08-01 03:00:00',NULL,'super meta','[\"levicastro\",\"santiago\"]','[]',5,16,30000,'COLECTIVO','2020-08-12 15:45:00','2020-08-10 00:00:00','calle 7',4,NULL,NULL),(13,'2020-08-10 03:00:00','2020-08-10 03:00:00',NULL,'MONTO 60 K','[\"Santi\",\"levi\"]','[]',21,22,60000,'INDIVIDUAL','2020-08-22 06:28:00','2020-08-11 00:00:00','Santa ana 23645',20,NULL,NULL);
UNLOCK TABLES;

DROP TABLE IF EXISTS `Role`;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Role` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `RoleMapping`;
CREATE TABLE `RoleMapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(255) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `principalId` (`principalId`)
) ENGINE=InnoDB;

LOCK TABLES `RoleMapping` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `methodNames` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Roles` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `ToContacts`;
CREATE TABLE `ToContacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menssage` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `ToContacts` WRITE;
INSERT INTO `ToContacts` VALUES (1,'type string'),(2,'type string');
UNLOCK TABLES;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `User` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(512) DEFAULT NULL,
  `typeRole` enum('PROYECTO','CLIENTE','ADMIN','VENDEDOR','COLABORADOR','INSTITUCION') NOT NULL,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  `address` varchar(512) DEFAULT NULL,
  `dni_cuil` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `Users` WRITE;
INSERT INTO `Users` VALUES (1,NULL,'PROYECTO',NULL,'levinic','$2a$10$BAEiiSPvfQs5QlTAivs7juO2qi5HEbyCdQMehQPRx4kSRomWOrr9u',0,NULL,NULL,NULL),(2,NULL,'CLIENTE','cliente','cliente','$2a$10$BAEiiSPvfQs5QlTAivs7juO2qi5HEbyCdQMehQPRx4kSRomWOrr9u',0,NULL,NULL,NULL),(3,NULL,'COLABORADOR','colaborador','colaborador','$2a$10$7WlAOWzApyIlwND4N23N4eG3ipkgvR5Lr2DDzAq1P3WamTZSleIVi',0,NULL,NULL,NULL),(4,NULL,'INSTITUCION','institucion',NULL,NULL,0,NULL,'calle 5',NULL),(5,NULL,'CLIENTE','levi','38645191',NULL,0,NULL,'calle 6',38645191),(6,NULL,'PROYECTO','XXXXXXXXX5','XXXXXXXXX5','$2a$10$9gfCmE0Ma0Wr6yotO3s1NetP3.9tHTbnqJYHgLCG1IvsFejDOmS8e',0,NULL,NULL,NULL),(7,NULL,'PROYECTO','XXXXXXXXX6','XXXXXXXXX6','$2a$10$.MHlCfbB.hmCR7U/LBRqY.teWXZhw6FUy70xlfb3njb/PU7LXBeGO',0,NULL,NULL,NULL),(8,NULL,'PROYECTO','XXXXXXXXX7','XXXXXXXXX7','$2a$10$cQCSjL1oKX6DnAQz3HbPS.8YeT97u/q38Hz/NlRM2lW/chImBIdRa',0,NULL,NULL,NULL),(9,NULL,'PROYECTO','tutti9','tutti9','$2a$10$uQEC7T//.B32jemG/G2YNul.KS7gxh5tlbdLBEgYFfhvzCE90IPpK',0,NULL,NULL,NULL),(10,NULL,'PROYECTO','tutti10','tutti10','$2a$10$HptKrHPeqo6jZP4vBZ.1r.y5XZt3QsnvcOLT.NlzAD4pInhyUoMUO',0,NULL,NULL,NULL),(11,NULL,'PROYECTO','tutti11','tutti11','$2a$10$9.0VhXP7oIxFmh9U52GxYuMYCooOwvlzfdjBhLxFcSgSwhV8lbPHS',0,NULL,NULL,NULL),(12,NULL,'PROYECTO','tutti12','tutti12','$2a$10$sgoUZ2pNNqCXk7wCFXD1mOVNSk8CoFoDLwDJvR5Sc20xIf.Z1FOMy',0,NULL,NULL,NULL),(13,NULL,'PROYECTO','tutti13','tutti13','$2a$10$tH6fFyp.XL71UJ7pKDJ65Oi2vgSmEbuO3778.XHNjYEvpHPOx3jDi',0,NULL,NULL,NULL),(14,NULL,'PROYECTO','tutti14','tutti14','$2a$10$V2sbZWzRfyAiWr0aINklZ.47/apQeKowBYeUKDz2Fg/oB6DmwaUbC',0,NULL,NULL,NULL),(15,NULL,'PROYECTO','tutti15','tutti15','$2a$10$.fvtyZcLYr3i36CFErKAzeNnzEhzveO4oTwN9bGe7KWrIXKLtVAWq',0,NULL,NULL,NULL),(16,NULL,'PROYECTO','tutti16','tutti16','$2a$10$vH4axvGL3gkJEiQgqFEE4uOG/azovbRAL7fMgoc.23ID2GDf2CCYm',0,NULL,NULL,NULL),(17,NULL,'ADMIN','juan pedro','juanpedro123','$2a$10$YaaQNm135MuDUCl6u2.waOi6E40u4Algg89MkaWYOKoCXMYfJP9qm',0,NULL,'la concha de tu vieja 500',3000000),(18,'sanu123@gmail.com','ADMIN','SANTIAGO','sanuel','$10$7WlAOWzApyIlwND4N23N4eG3ipkgvR5Lr2DDzAq1P3WamTZSleIVi',0,NULL,'AV1255',36458993),(19,NULL,'COLABORADOR','pepe','pepe22',NULL,NULL,NULL,'deasda425',3648516),(20,NULL,'INSTITUCION','dsadsad',NULL,NULL,0,NULL,'dsda351',NULL),(21,NULL,'CLIENTE','Santiago','38645159','$2a$10$KzJD7Qw37u9sqeINkafL0OBCsFbKXPr7Dkczd.HCsRAD2gKbQI7du',0,NULL,'Felix paz 336',38645159),(22,NULL,'PROYECTO','tutti22','tutti22','$2a$10$.P3SqcMY.giuX6sL0yj4n.jH8dK9OZ3Vk8iRvTzK5Ter5baPb2TJa',0,NULL,NULL,NULL),(23,'dea@gmail.com','COLABORADOR','sadsadsa','dsadsa',NULL,0,NULL,'dsadsa',3864521),(24,NULL,'ADMIN','admin','admin','$2a$10$3l84EPb0jj8P/j7vPBykC.c.ONgvSHpM5Jmb5NjwIqp9NkASBGyTC',0,NULL,'admin',NULL);
UNLOCK TABLES;

SET foreign_key_checks = 1;