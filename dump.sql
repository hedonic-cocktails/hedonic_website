PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`shipping_address` text NOT NULL,
	`items` text NOT NULL,
	`total` real NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text
);
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`tagline` text NOT NULL,
	`description` text NOT NULL,
	`ingredients` text NOT NULL,
	`spirit` text NOT NULL,
	`price` real NOT NULL,
	`volume` text NOT NULL,
	`servings` integer NOT NULL,
	`abv` text NOT NULL,
	`image_url` text NOT NULL,
	`color` text NOT NULL,
	`featured` integer DEFAULT false
, `image_urls` text DEFAULT '[]' NOT NULL);
INSERT INTO products VALUES('462b61e4-2482-47af-894d-2ea57abd26d8','Dirty Shirley','dirty-shirley','Clarified, carbonated, and dangerously smooth.','A sophisticated take on the classic Shirley Temple, elevated with premium vodka. The entire cocktail is clarified to a stunning translucent pink hue, then carbonated for a crisp, effervescent finish. Bright grenadine sweetness meets fresh lime in a sparkling cocktail that looks like liquid jewels and drinks like velvet.','Vodka, Grenadine, Fresh Lime, Carbonated','Vodka',29.989999999999998436,'750mL',5,'12.5%','/images/dirty-shirley.png','#c94060',1,'["/images/dirty-shirley.png","/images/dirty-shirley.png"]');
INSERT INTO products VALUES('711e302e-165d-41aa-9e54-a03660aa3182','Orange Julius','orange-julius','Creamy citrus indulgence, clarified and sparkling.','The nostalgic orange cream flavor you remember, transformed into a crystal-clear sparkling indulgence. The entire cocktail is clarified to a pale, luminous gold reminiscent of fine white wine, then carbonated for lively effervescence. Vodka melds with fresh orange juice and house-made vanilla syrup, delivering dreamsicle flavors in a remarkably elegant, sparkling form.','Vodka, Fresh Orange Juice, Vanilla Syrup, Carbonated','Vodka',29.989999999999998436,'750mL',5,'12.5%','/images/orange-julius.png','#e8a040',1,'["/images/orange-julius.png","/images/orange-julius.png"]');
INSERT INTO products VALUES('cc480c59-fd71-4a42-aab6-5e6d0c8338ab','Mezcal Soda','mezcal-soda','Smoky, bright, and brilliantly clear.','For those who crave depth and complexity. Premium mezcal brings its signature smokiness, perfectly tempered by bright lemon and a whisper of vanilla syrup. The entire cocktail is clarified to a pristine pale gold, like a fine white wine, then carbonated for a crisp, sparkling finish. Endlessly drinkable with a long, smoldering finish that lingers beautifully.','Mezcal, Fresh Lemon, Vanilla Syrup, Carbonated','Mezcal',29.989999999999998436,'750mL',5,'12.5%','/images/mezcal-soda.png','#c4a050',1,'["/images/mezcal-soda.png","/images/mezcal-soda.png"]');
INSERT INTO products VALUES('9e8c9bb1-b4f0-49d4-aece-df17a60b46a5','Whiskey Sour','whiskey-sour','Bold, bright, and beautifully balanced.','The timeless whiskey sour, perfected and clarified. Premium whiskey meets fresh lemon juice and house-made sugar syrup, then the entire cocktail is clarified to a luminous amber gold. Carbonated for a crisp, sparkling lift that opens up the whiskey''s depth. Bold enough to respect the spirit, bright enough to keep you coming back.','Whiskey, Fresh Lemon, Sugar Syrup, Carbonated','Whiskey',29.989999999999998436,'750mL',5,'15%','/images/whiskey-sour.png','#d4a340',1,'["/images/whiskey-sour.png","/images/IMG_1258.jpeg","/images/IMG_1215.jpeg","/images/IMG_1225.jpeg"]');
INSERT INTO products VALUES('63440445-3adc-41c2-a70c-039cd0cc031c','Strawberry Daiquiri','strawberry-daiquiri','Sun-kissed sweetness, impossibly clear.','Forget the frozen slush — this is the daiquiri reborn. Premium rum and ripe strawberries are balanced with fresh lime, then the entire cocktail is clarified to a breathtaking rose-pink transparency. Carbonated for an effervescent finish that dances on the palate. Every sip is summer in a glass, elegant and endlessly refreshing.','Rum, Strawberry, Fresh Lime, Carbonated','Rum',29.989999999999998436,'750mL',5,'12.5%','/images/strawberry-daiquiri.png','#e05878',1,'["/images/strawberry-daiquiri.png","/images/strawberry-daiquiri.png"]');
INSERT INTO products VALUES('072e3966-f760-4496-8baf-5ec6cf4ddd2b','Clover Club','clover-club','Refined raspberry elegance, sparkling and clear.','A pre-Prohibition classic revived with modern technique. London dry gin meets fresh raspberries and bright lemon, then the entire cocktail is clarified to a stunning translucent blush. Carbonated for a lively, effervescent texture. Tart, botanical, and impossibly smooth — a cocktail that proves sophistication and pleasure are the same thing.','Gin, Raspberry, Fresh Lemon, Carbonated','Gin',29.989999999999998436,'750mL',5,'13.6%','/images/clover-club.png','#c44870',1,'["/images/clover-club.png","/images/clover-club.png"]');
INSERT INTO products VALUES('3ccc0c8e-5cd7-400f-9018-400c634f69d5','Blackberry Smash','blackberry-smash','Bright berries meet bourbon warmth, beautifully clear.','A breathtaking modern smash that balances power with elegance. Premium bourbon meets the deep, tart sweetness of ripe blackberries and bright lemon, then the entire cocktail is clarified to a stunning, translucent jewel-toned purple. Carbonated for a lively, effervescent lift. Rich, refreshing, and endlessly complex.','Bourbon, Blackberry, Fresh Lemon, Carbonated','Bourbon',29.989999999999998436,'750mL',5,'12.5%','/images/blackberry-smash-v2.png','#8b3a62',1,'["/images/blackberry-smash-v2.png","/images/blackberry-smash-v2.png"]');
INSERT INTO products VALUES('820867ec-26ac-4eb1-879a-24a704f056e9','Pheromone Martini','pheromone-martini','Dark, exotic, and irresistibly seductive.','Our most provocative creation. Premium bourbon meets tropical passionfruit and a whisper of dark chocolate, then the entire cocktail is clarified to a pale amber. Carbonated for a silky effervescence that carries waves of exotic fruit and rich cacao. Intoxicating in every sense — a cocktail that pulls you in and doesn''t let go.','Bourbon, Passionfruit, Dark Chocolate, Carbonated','Bourbon',29.989999999999998436,'750mL',5,'15%','/images/pheromone-martini.png','#b8864e',1,'["/images/pheromone-martini.png","/images/pheromone-martini.png"]');
INSERT INTO products VALUES('49119fcf-7c48-4f72-8ddb-b55460f3e0ed','Lovingly Light','lovingly-light','Four bright favorites in one box.','A curated collection of our most radiant, uplifting cocktails. Four 187mL bottles — Clover Club, Strawberry Daiquiri, Orange Julius, and Dirty Shirley — each one clarified, carbonated, and ready to pour. Bright berries, sunny citrus, and sparkling sweetness. Perfect for sharing, gifting, or savoring one beautiful evening at a time.','Clover Club, Strawberry Daiquiri, Orange Julius, Dirty Shirley','Variety',34.99000000000000199,'4 x 187mL',5,'12.5%','/images/lovingly-light.png','#e0708a',1,'["/images/lovingly-light.png","/images/lovingly-light.png"]');
INSERT INTO products VALUES('f0168a67-7ffd-4321-b8cb-a8864bebde03','Dark & Seductive','dark-and-seductive','Four bold indulgences in one box.','A curated collection of our most provocative, complex cocktails. Four 187mL bottles — Pheromone Martini, Mezcal Soda, Whiskey Sour, and Blackberry Smash — each one clarified, carbonated, and ready to pour. Smoky depth, bright berries, and exotic allure. For the evenings that call for something darker.','Pheromone Martini, Mezcal Soda, Whiskey Sour, Blackberry Smash','Variety',34.99000000000000199,'4 x 187mL',5,'12.5%','/images/dark-and-seductive.png','#a07040',1,'["/images/dark-and-seductive.png","/images/dark-and-seductive.png"]');
CREATE TABLE `batches` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`product_id` text NOT NULL,
	`bottles_750ml` integer DEFAULT 0 NOT NULL,
	`bottles_187ml` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text
);
INSERT INTO batches VALUES('3a1a36ac-9c2a-459c-8ab7-27134681193d','DS_001','462b61e4-2482-47af-894d-2ea57abd26d8',4,2,'dead','2026-07-01T21:04:24.306Z');
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);
COMMIT;
