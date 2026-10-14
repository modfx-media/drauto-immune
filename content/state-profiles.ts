/**
 * Per-state qualitative profiles for the state × condition matrix pages.
 *
 * Rules for everything in this file:
 * - Only well-known geography, time zones, and broad climate character.
 * - No disease prevalence figures, no local clinic names, no licensing claims.
 * - Boulder, Colorado is on Mountain Time and observes daylight saving time.
 */

export type ClimateBand =
  | "cold-north"
  | "humid-south"
  | "arid-southwest"
  | "pacific-nw"
  | "mountain-west"
  | "midwest"
  | "northeast"
  | "florida-tropics"
  | "alaska"
  | "hawaii";

export type StateProfile = {
  slug: string;
  timezoneNote: string;
  climateBand: ClimateBand;
  geographyNote: string;
  intakeNote: string;
  labNote: string;
};

export const STATE_PROFILES: Record<string, StateProfile> = {
  alabama: {
    slug: "alabama",
    timezoneNote: "Central Time for the whole state",
    climateBand: "humid-south",
    geographyNote:
      "Alabama stretches from the southern tip of the Appalachian foothills near Huntsville, through the Black Belt prairie soils of the middle of the state, down to the Gulf shoreline around Mobile Bay. The Tennessee River valley in the north and the coastal plain in the south make for very different day-to-day surroundings within one state.",
    intakeNote:
      "Alabama keeps Central Time, which puts your clock one hour ahead of Boulder. When you pick an appointment, read the confirmation twice so a Mountain Time slot does not catch you an hour off.",
    labNote:
      "If you live around Birmingham, Huntsville, or Mobile, a commercial draw site in your own metro area is the usual starting point, while people in the Black Belt or the rural north may plan around the nearest county seat. National networks such as LabCorp are common reference points, and the office confirms what is realistic for your address before orders go out.",
  },
  alaska: {
    slug: "alaska",
    timezoneNote: "Alaska Time for nearly all of the state, with the far western Aleutians on Hawaii-Aleutian Time",
    climateBand: "alaska",
    geographyNote:
      "Alaska is the largest state by area, and most communities are not linked to the rest of the continental road network. Anchorage sits on Cook Inlet, Fairbanks lies in the interior, and Juneau, the capital, can be reached only by air or water.",
    intakeNote:
      "Alaska Time runs two hours behind Boulder all year, because both places shift clocks together. A video visit does not care how remote your community is, but it does need a steady connection, so test your setup before the call.",
    labNote:
      "Anchorage, Fairbanks, and Juneau are the places most patients think of first for a blood draw, and many other communities depend on a regional hub reached by road, ferry, or small plane. Tell the office early where you can realistically travel, so orders are matched to a site you can reach in winter as well as summer.",
  },
  arizona: {
    slug: "arizona",
    timezoneNote: "Mountain Standard Time year-round across most of the state, which does not observe daylight saving time",
    climateBand: "arid-southwest",
    geographyNote:
      "Arizona is best known for the Sonoran Desert around Phoenix and Tucson, yet the Colorado Plateau and the Grand Canyon country in the north are high, cooler, and look nothing like the desert floor. Mesa and the other Phoenix-area cities spread across a wide valley ringed by mountains.",
    intakeNote:
      "Most of Arizona stays on Mountain Standard Time all year while Boulder shifts for daylight saving. That means your clock matches Boulder in winter and runs an hour behind it in summer, so confirm the time zone on every reminder.",
    labNote:
      "Phoenix, Tucson, and Mesa residents generally look to draw sites inside their own metro area, and people on the plateau or in the outlying desert towns may combine the trip with other errands. Because summer heat makes midday travel unpleasant, many patients ask about the earliest morning visit a lab allows.",
  },
  arkansas: {
    slug: "arkansas",
    timezoneNote: "Central Time for the whole state",
    climateBand: "humid-south",
    geographyNote:
      "Arkansas pairs the Ozark and Ouachita highlands with the flat Mississippi Delta lowlands in the east. Little Rock sits near the middle on the Arkansas River, Fort Smith lies on the same river at the Oklahoma border, and Fayetteville is tucked into the Ozarks in the northwest.",
    intakeNote:
      "Arkansas follows Central Time, one hour ahead of Boulder. Patients balancing farm, school, or shift schedules can ask for a slot that does not collide with their day once the time difference is accounted for.",
    labNote:
      "Little Rock, Fayetteville, and Fort Smith are natural hubs for commercial lab visits, and Delta and Ozark residents often plan the drive around a regional town they already use. National lab networks such as LabCorp may have a patient service center closer than you expect, and the office helps confirm one.",
  },
  california: {
    slug: "california",
    timezoneNote: "Pacific Time for the whole state",
    climateBand: "arid-southwest",
    geographyNote:
      "California runs from redwood-lined coast to the Sierra Nevada, through the long Central Valley and into the deserts of the southeast. Sacramento sits in the valley, San Francisco wraps around its bay, Los Angeles spreads across a basin, and San Diego is near the Mexican border.",
    intakeNote:
      "California is on Pacific Time, one hour behind Boulder, so a Mountain Time slot arrives an hour earlier on your clock. Commuters in Los Angeles or the Bay Area should pad for the drive home, not just the video link.",
    labNote:
      "In Los Angeles, San Francisco, and San Diego, patients can usually compare several commercial draw sites by commute and parking, while people in the Sierra foothills, the Central Valley, or the desert may travel farther. The office works from your address and your schedule, not a statewide assumption.",
  },
  colorado: {
    slug: "colorado",
    timezoneNote: "Mountain Time for the whole state, the same as the Boulder office",
    climateBand: "mountain-west",
    geographyNote:
      "Colorado is split by the Rocky Mountains into the Front Range cities, the high mountain valleys, the Western Slope, and the plains of the east. Denver sits at the foot of the mountains, Colorado Springs lies to the south along the Front Range, and Boulder, the home base for Dr. Autoimmune, is tucked against the foothills.",
    intakeNote:
      "Colorado shares the Boulder office time zone, so there is no clock arithmetic at all. Patients in the mountains can still plan for weather and mountain driving when a lab draw is on the calendar.",
    labNote:
      "Denver, Colorado Springs, and Boulder offer the widest choice of commercial draw sites, and mountain communities may mean a longer trip over a pass. Because the practice is based here, the office knows the geography, and it still confirms a convenient location with you before orders are sent.",
  },
  connecticut: {
    slug: "connecticut",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "Connecticut packs a Long Island Sound shoreline, the broad Connecticut River valley, and the wooded hills of the northwest corner into a small state. Hartford sits on the river, Bridgeport and New Haven face the Sound, and most places are a short drive from the next town.",
    intakeNote:
      "Connecticut is on Eastern Time, two hours ahead of Boulder, so an afternoon Mountain slot can fall near the end of your workday. Say up front if you need an earlier or later window so the office can look.",
    labNote:
      "From Hartford to Bridgeport and New Haven, most residents are within a short drive of a commercial draw site, so the question is usually which one fits your commute and not whether one exists. National networks such as LabCorp are a common choice, and the office confirms details before you go.",
  },
  delaware: {
    slug: "delaware",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "Delaware is one of the smallest states, with just three counties running from the Wilmington area on the Delaware River down through Dover to the Atlantic beaches and Delaware Bay in the south. The land is largely flat coastal plain.",
    intakeNote:
      "Delaware observes Eastern Time, two hours ahead of Boulder. Because the state is so compact, patients in Wilmington, Dover, and Newark all share the same clock math, which keeps scheduling simple.",
    labNote:
      "Wilmington, Dover, and Newark sit close enough together that a lab visit rarely takes much of a day, and some Delaware patients cross a state line for a more convenient site. The office checks that the lab you choose can accept the order before you make the trip.",
  },
  florida: {
    slug: "florida",
    timezoneNote: "Eastern Time for most of the state and Central Time in the western Panhandle",
    climateBand: "florida-tropics",
    geographyNote:
      "Florida is a long peninsula with Gulf and Atlantic coastlines, the Everglades in the south, and the Panhandle reaching west toward Alabama. Miami sits on the southeast coast, Tampa on the Gulf side, and Orlando inland in the central part of the state.",
    intakeNote:
      "Most of Florida is two hours ahead of Boulder, but the western Panhandle is on Central Time, which is one hour ahead. Patients near the time zone line should state their local time when booking.",
    labNote:
      "Miami, Orlando, and Tampa each have a crowded field of commercial draw sites, while Panhandle and rural-interior patients may have fewer choices and longer drives. Tell the office which part of Florida you live in so the plan reflects real distances, not a peninsula-wide guess.",
  },
  georgia: {
    slug: "georgia",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "humid-south",
    geographyNote:
      "Georgia climbs from the Atlantic coast near Savannah through the coastal plain to the Piedmont around Atlanta and into the Blue Ridge foothills in the north. Augusta sits on the Savannah River at the South Carolina line, and the Okefenokee Swamp spreads across the southeast.",
    intakeNote:
      "Georgia is on Eastern Time, two hours ahead of Boulder. Atlanta traffic patterns are a real scheduling factor, so ask for a slot that leaves breathing room after a lab trip.",
    labNote:
      "Atlanta, Savannah, and Augusta have commercial draw sites in and around them, and south Georgia or north Georgia mountain patients may rely on a smaller regional town. The office confirms a workable location that matches your address and your calendar.",
  },
  hawaii: {
    slug: "hawaii",
    timezoneNote: "Hawaii-Aleutian Standard Time, with no daylight saving time",
    climateBand: "hawaii",
    geographyNote:
      "Hawaii is a chain of volcanic islands in the middle of the Pacific. Honolulu is on Oahu, Hilo is on the east side of Hawaii Island, and Kailua is another well-known town; getting between islands means a flight or boat.",
    intakeNote:
      "Hawaii does not change clocks, so it is three hours behind Boulder in winter and four hours behind in summer. Early Hawaii mornings are mid-day on the Boulder calendar, which is worth keeping in mind when you book.",
    labNote:
      "Honolulu, Hilo, and Kailua are the towns most patients picture when they think about a lab visit, and anyone living on a smaller or more remote island may have to plan around a flight or ferry. Share your island and nearest town up front so orders land at a site you can actually reach.",
  },
  idaho: {
    slug: "idaho",
    timezoneNote: "Mountain Time for southern Idaho and Pacific Time for the northern Panhandle",
    climateBand: "mountain-west",
    geographyNote:
      "Idaho spans the Snake River Plain in the south, the high Sawtooth and Rocky Mountain ranges in the middle, and a forested Panhandle in the north. Boise sits at the edge of the foothills, and Meridian and Nampa fill out the Treasure Valley around it.",
    intakeNote:
      "Southern Idaho shares Boulder Mountain Time, while the northern Panhandle is on Pacific Time, one hour behind. Tell the office which side of the line you live on so reminders land at the right hour.",
    labNote:
      "Boise, Meridian, and Nampa share a cluster of commercial draw sites in the Treasure Valley, while patients in the panhandle, the Sawtooth country, or the eastern part of the state may drive longer to a regional hub. The office confirms a location that makes sense for your road conditions.",
  },
  illinois: {
    slug: "illinois",
    timezoneNote: "Central Time for the whole state",
    climateBand: "midwest",
    geographyNote:
      "Illinois is flat prairie and farmland for most of its length, anchored by Chicago on the shore of Lake Michigan. Springfield, the capital, is in the middle of the state, and Aurora and Naperville are large suburbs to the west of Chicago.",
    intakeNote:
      "Illinois runs on Central Time, one hour ahead of Boulder. Chicago-area patients juggling commutes may want to ask early about which end of the day works best.",
    labNote:
      "The Chicago area, including Aurora and Naperville, has a wide choice of commercial draw sites, and downstate patients around Springfield or in smaller prairie towns may have fewer. National networks such as LabCorp are a typical reference, and the office confirms a site near you.",
  },
  indiana: {
    slug: "indiana",
    timezoneNote: "Eastern Time for most of the state, with Central Time in the northwest and southwest corners",
    climateBand: "midwest",
    geographyNote:
      "Indiana mixes farmland and small cities with a short Lake Michigan shoreline in the northwest and the Ohio River along the southern edge. Indianapolis sits in the center, Fort Wayne in the northeast, and Evansville down on the Ohio River.",
    intakeNote:
      "Most of Indiana is two hours ahead of Boulder, but a few counties near Chicago and Evansville are on Central Time. Make sure the office knows which time zone your own county uses.",
    labNote:
      "Indianapolis, Fort Wayne, and Evansville each anchor a region with commercial draw sites, and farm-country residents may plan a lab stop around a trip into the nearest city. The office confirms a location that fits your schedule before orders go out.",
  },
  iowa: {
    slug: "iowa",
    timezoneNote: "Central Time for the whole state",
    climateBand: "midwest",
    geographyNote:
      "Iowa sits between the Mississippi River on the east and the Missouri River on the west, with rolling farmland in between. Des Moines is in the center, Cedar Rapids follows the Cedar River, and Davenport is on the Mississippi.",
    intakeNote:
      "Iowa is on Central Time, one hour ahead of Boulder. Patients on farm schedules can ask for slots that avoid early chores or late milking, and the office will see what is possible.",
    labNote:
      "Des Moines, Cedar Rapids, and Davenport are the usual hubs for commercial lab work, and patients in smaller river and farm towns often use a county seat they already visit. The office helps confirm a site that is practical for your community.",
  },
  kansas: {
    slug: "kansas",
    timezoneNote: "Central Time for most of the state, with a few far-western counties on Mountain Time",
    climateBand: "midwest",
    geographyNote:
      "Kansas is Great Plains country, with the Flint Hills prairie running through the east and flatter wheat land farther west. Wichita sits on the Arkansas River, Topeka is the capital, and Overland Park and Kansas City make up the Kansas side of the Kansas City metro area.",
    intakeNote:
      "Most of Kansas is one hour ahead of Boulder, while a handful of western counties share Boulder Mountain Time. If you live out west, say which one your community keeps.",
    labNote:
      "Wichita, Overland Park, and Kansas City provide a range of commercial draw sites, and plains communities may mean a drive to a regional hub. Because distances in western Kansas can be long, the office asks where you can realistically go before orders are placed.",
  },
  kentucky: {
    slug: "kentucky",
    timezoneNote: "Eastern Time in the eastern half and Central Time in the western half of the state",
    climateBand: "humid-south",
    geographyNote:
      "Kentucky runs from the Appalachian hills in the east through the rolling Bluegrass region around Lexington to the Ohio River along its northern edge, where Louisville sits. Bowling Green lies in the south-central part of the state near Mammoth Cave country.",
    intakeNote:
      "Kentucky is divided between Eastern and Central Time, so your offset from Boulder is either two hours or one hour. Louisville and Lexington are both in the Eastern zone, but Bowling Green is in the Central zone, so check your own town.",
    labNote:
      "Louisville, Lexington, and Bowling Green each have commercial draw sites, and people in eastern Kentucky hollows or river towns may drive to the nearest regional hub. The office confirms a location that is reachable in all seasons, with mountain roads in mind.",
  },
  louisiana: {
    slug: "louisiana",
    timezoneNote: "Central Time for the whole state",
    climateBand: "humid-south",
    geographyNote:
      "Louisiana is shaped by the Mississippi River delta, coastal marsh, and bayou country along the Gulf of Mexico. New Orleans and Baton Rouge both sit on the Mississippi, while Shreveport lies in the northwest on the Red River.",
    intakeNote:
      "Louisiana is on Central Time, one hour ahead of Boulder. After storm season disruptions, patients sometimes lose power or internet, so mention a backup plan such as phone contact when booking.",
    labNote:
      "New Orleans, Baton Rouge, and Shreveport have commercial draw sites, while bayou and rural parish residents may have fewer options nearby. Mention storm-season plans too, since a draw may need to be rescheduled if roads or power are disrupted.",
  },
  maine: {
    slug: "maine",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "cold-north",
    geographyNote:
      "Maine is mostly forest, with a long rocky coastline and thousands of coastal islands. Portland sits on Casco Bay, Lewiston lies on the Androscoggin River, and Bangor is on the Penobscot River, with large stretches of woods to the north.",
    intakeNote:
      "Maine is two hours ahead of Boulder on Eastern Time. If winter storms or rural service make home internet unreliable, tell the office before your first visit so a fallback plan is ready.",
    labNote:
      "Portland, Lewiston, and Bangor are the best-known hubs for a commercial blood draw, and patients along the coast, on islands, or in the northern woods may plan a longer trip. The office confirms a site you can reach even when winter weather is in the forecast.",
  },
  maryland: {
    slug: "maryland",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "Maryland is split by the Chesapeake Bay, with the Eastern Shore on one side and the Baltimore-Washington corridor on the other. Baltimore is a port city, Annapolis is the state capital on the bay, and Frederick sits near the Appalachian foothills in the west.",
    intakeNote:
      "Maryland is two hours ahead of Boulder on Eastern Time. Commuters toward Baltimore or Washington can ask for a slot that dodges the busiest traffic windows.",
    labNote:
      "Baltimore, Annapolis, and Frederick offer several commercial draw sites, and Eastern Shore and western Maryland patients may drive to a larger town. Because commuting patterns here are busy, the office asks about the time of day that works best for a draw.",
  },
  massachusetts: {
    slug: "massachusetts",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "Massachusetts reaches from Cape Cod and the Boston Harbor shoreline across Worcester's hills to the Connecticut River valley and the Berkshires in the far west. Springfield anchors the valley, and Boston sits at the eastern edge.",
    intakeNote:
      "Massachusetts runs on Eastern Time, two hours ahead of Boulder. Boston-area patients with busy workdays may want to ask whether a late-afternoon Mountain slot is open.",
    labNote:
      "Boston, Worcester, and Springfield have many commercial draw sites, and Berkshire or Cape patients may travel to a regional center. National networks such as LabCorp are a common reference point, and the office confirms a site that fits your route.",
  },
  michigan: {
    slug: "michigan",
    timezoneNote: "Eastern Time for most of the state, with four Upper Peninsula counties on Central Time",
    climateBand: "cold-north",
    geographyNote:
      "Michigan is made of two peninsulas bordered by four of the Great Lakes. Detroit sits on the Detroit River in the southeast, Grand Rapids lies in the west, and Ann Arbor is a university city west of Detroit, with Lansing as the capital.",
    intakeNote:
      "Most of Michigan is two hours ahead of Boulder, but a few Upper Peninsula counties are only one hour ahead. Lower Peninsula patients should simply read the Eastern Time label on each confirmation.",
    labNote:
      "Detroit, Grand Rapids, and Ann Arbor are the principal hubs for commercial lab visits, and patients in the Upper Peninsula or northern Lower Peninsula may drive far for a draw. The office plans around the distances and winter roads you actually face.",
  },
  minnesota: {
    slug: "minnesota",
    timezoneNote: "Central Time for the whole state",
    climateBand: "cold-north",
    geographyNote:
      "Minnesota is known for its many lakes, the North Shore of Lake Superior, and the headwaters of the Mississippi River. Minneapolis and Saint Paul sit side by side along the river, and Rochester lies in the southeast.",
    intakeNote:
      "Minnesota is on Central Time, one hour ahead of Boulder. When deep winter makes driving hard, a video visit means you do not have to cross an icy road to reach the appointment itself.",
    labNote:
      "Minneapolis, Saint Paul, and Rochester have commercial draw sites in and near them, and patients in lake country or the northern counties may have a long winter drive. Tell the office what is realistic so a draw does not hinge on a snowy highway.",
  },
  mississippi: {
    slug: "mississippi",
    timezoneNote: "Central Time for the whole state",
    climateBand: "humid-south",
    geographyNote:
      "Mississippi stretches from the flat Delta along the great river in the west through pine woods in the south to a short Gulf shoreline around Gulfport. Jackson sits near the center, and Southaven is in the northwest corner next to the Memphis area.",
    intakeNote:
      "Mississippi is one hour ahead of Boulder on Central Time. Rural patients whose connection is shaky can ask about a phone-only fallback before the first appointment.",
    labNote:
      "Jackson, Gulfport, and Southaven are the most common anchors for commercial lab work, and Delta and piney-woods residents may plan around a nearby regional town. The office confirms a site you can reach before orders are sent.",
  },
  missouri: {
    slug: "missouri",
    timezoneNote: "Central Time for the whole state",
    climateBand: "midwest",
    geographyNote:
      "Missouri is where the Missouri and Mississippi rivers meet near St. Louis, with the Ozark hills covering the south. Kansas City lies on the western border, Jefferson City sits on the Missouri River, and Springfield is in the southwest.",
    intakeNote:
      "Missouri keeps Central Time, one hour ahead of Boulder. Patients in Kansas City who cross into Kansas for work should still use the Central time label, since both sides match.",
    labNote:
      "Kansas City, St. Louis, and Springfield have commercial draw sites in and around them, and Ozark and bootheel patients may drive to a regional hub. The office asks about your address so orders go to a location that suits you.",
  },
  montana: {
    slug: "montana",
    timezoneNote: "Mountain Time for the whole state, the same as Boulder",
    climateBand: "mountain-west",
    geographyNote:
      "Montana's Rocky Mountains fill the western half, while the east opens into Great Plains ranch land. Billings sits on the Yellowstone River, Missoula lies in a western mountain valley, and Bozeman is near the Gallatin Valley with Helena as the capital.",
    intakeNote:
      "Montana shares Mountain Time with Boulder, so appointment times line up exactly. Long drives between towns are the real scheduling factor, not the clock.",
    labNote:
      "Billings, Missoula, and Bozeman have commercial draw sites, but a trip from a ranch or small mountain town can take hours. Tell the office how far you can travel and in which season, and orders can be matched to a realistic location.",
  },
  nebraska: {
    slug: "nebraska",
    timezoneNote: "Central Time for most of the state and Mountain Time for the western panhandle",
    climateBand: "midwest",
    geographyNote:
      "Nebraska is plains country, with the Platte River crossing the state and the grass-covered Sandhills in the north-central region. Omaha lies on the Missouri River, Lincoln is the capital, and Bellevue sits just south of Omaha.",
    intakeNote:
      "Most of Nebraska is one hour ahead of Boulder, but the far west matches Boulder Mountain Time. Patients near Scottsbluff or the panhandle should name their zone when booking.",
    labNote:
      "Omaha, Lincoln, and Bellevue have a range of commercial draw sites, while Sandhills and panhandle patients may rely on a regional hub that is a long drive away. The office confirms a site that fits your distance and schedule.",
  },
  nevada: {
    slug: "nevada",
    timezoneNote: "Pacific Time for nearly all of the state, with a small area on Mountain Time",
    climateBand: "arid-southwest",
    geographyNote:
      "Nevada is mostly high desert and Great Basin mountain ranges, with the Mojave Desert in the south. Las Vegas and Henderson share a desert valley, Reno lies near the eastern flank of the Sierra Nevada, and Carson City is the capital.",
    intakeNote:
      "Nevada runs on Pacific Time, one hour behind Boulder. Las Vegas patients who work late-night hours can ask for the slot that fits their sleep, not the standard day.",
    labNote:
      "Las Vegas, Reno, and Henderson are the largest hubs for commercial lab work, and patients in rural Nevada may cross long stretches of open desert to reach one. Summer heat and winter passes both matter, so tell the office what travel looks like for you.",
  },
  "new-hampshire": {
    slug: "new-hampshire",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "New Hampshire has the White Mountains in the north, the Lakes Region in the middle, and just a short stretch of Atlantic coast. Manchester is the largest city, Nashua sits near the Massachusetts line, and Concord is the capital.",
    intakeNote:
      "New Hampshire is on Eastern Time, two hours ahead of Boulder. Patients in the north woods can plan for weather-related connection issues by sharing a phone number.",
    labNote:
      "Manchester, Nashua, and Concord have commercial draw sites, and White Mountain or north-country patients may drive longer. The office helps confirm a lab that works for you, including a plan if winter weather interferes.",
  },
  "new-jersey": {
    slug: "new-jersey",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "New Jersey runs from the dense suburbs between New York City and Philadelphia down to the Pine Barrens and the Jersey Shore. Newark and Jersey City face Manhattan across the Hudson, and Trenton, the capital, sits on the Delaware River.",
    intakeNote:
      "New Jersey is two hours ahead of Boulder on Eastern Time. Patients commuting into New York or Philadelphia can request the earliest or latest slot available.",
    labNote:
      "Newark, Jersey City, and Trenton sit in some of the densest parts of the country, so there are usually several draw sites to compare by commute and parking. The office confirms the lab that best matches your route.",
  },
  "new-mexico": {
    slug: "new-mexico",
    timezoneNote: "Mountain Time for the whole state, the same as Boulder",
    climateBand: "arid-southwest",
    geographyNote:
      "New Mexico is high desert and mountain country, with the Sangre de Cristo range in the north and the Rio Grande running through the state. Albuquerque sits along the river, Santa Fe is among the highest-elevation state capitals in the country, and Las Cruces lies in the southern river valley.",
    intakeNote:
      "New Mexico keeps Mountain Time, matching Boulder exactly. Because the state is large and sparsely populated, the question is usually whether your internet is strong enough, not the clock.",
    labNote:
      "Albuquerque, Santa Fe, and Las Cruces anchor commercial lab access, and patients in pueblos, ranch country, or high mountain villages may drive a long way. The office confirms a location that suits your roads and your calendar.",
  },
  "new-york": {
    slug: "new-york",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "New York includes New York City and Long Island, the Hudson Valley, the Adirondack Mountains, the Finger Lakes, and the Lake Erie shore near Buffalo. Albany, the capital, sits on the Hudson River.",
    intakeNote:
      "New York is two hours ahead of Boulder on Eastern Time. Upstate and downstate patients live in very different rhythms, so say what window genuinely works for your day.",
    labNote:
      "New York City, Buffalo, and Albany offer many commercial draw sites, and upstate patients near the Adirondacks or the Finger Lakes may rely on a regional town. The office asks where you live so orders go to a convenient site.",
  },
  "north-carolina": {
    slug: "north-carolina",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "humid-south",
    geographyNote:
      "North Carolina runs from the barrier islands of the Outer Banks across the Piedmont to the Blue Ridge and Great Smoky Mountains in the west. Charlotte and Greensboro sit in the Piedmont, and Raleigh anchors the Research Triangle area.",
    intakeNote:
      "North Carolina is on Eastern Time, two hours ahead of Boulder. Mountain patients in the west may rely on a mobile connection, so test it before your first visit.",
    labNote:
      "Charlotte, Raleigh, and Greensboro have numerous commercial draw sites, and coastal and mountain patients may travel farther to a regional hub. The office confirms a location that fits your address and your schedule.",
  },
  "north-dakota": {
    slug: "north-dakota",
    timezoneNote: "Central Time for most of the state and Mountain Time for the southwest",
    climateBand: "cold-north",
    geographyNote:
      "North Dakota sits on the northern Great Plains, with the flat Red River Valley along the eastern border and the Badlands in the west. Fargo and Grand Forks are on the Red River, and Bismarck is on the Missouri River.",
    intakeNote:
      "Most of North Dakota is one hour ahead of Boulder, while the southwest corner shares Mountain Time. Patients out there should confirm the zone for their county.",
    labNote:
      "Fargo, Bismarck, and Grand Forks are the usual hubs for commercial lab visits, and ranch and Badlands communities may mean a long drive. Winter travel is a real constraint, so tell the office what you can manage.",
  },
  ohio: {
    slug: "ohio",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "midwest",
    geographyNote:
      "Ohio stretches from the Lake Erie shore at Cleveland to the Ohio River at Cincinnati, with flat farmland in the west and Appalachian foothills in the southeast. Columbus, the capital, sits in the center.",
    intakeNote:
      "Ohio is two hours ahead of Boulder on Eastern Time. If you live in the Appalachian southeast, check your internet strength before booking a video visit.",
    labNote:
      "Columbus, Cleveland, and Cincinnati have many commercial draw sites, and patients in the Appalachian southeast or rural northwest may drive to a regional town. The office confirms a site that works for your location.",
  },
  oklahoma: {
    slug: "oklahoma",
    timezoneNote: "Central Time for the whole state",
    climateBand: "midwest",
    geographyNote:
      "Oklahoma is where the plains meet the Ozark and Ouachita uplands, with open prairie across much of the west. Oklahoma City lies in the center, Tulsa sits on the Arkansas River in the northeast, and Norman is just to the south of Oklahoma City.",
    intakeNote:
      "Oklahoma observes Central Time, one hour ahead of Boulder. Spring storm days can disrupt power, so keep a phone number ready as a fallback.",
    labNote:
      "Oklahoma City, Tulsa, and Norman have commercial draw sites in and around them, and panhandle or rural patients may drive to a regional hub. The office asks about your location so orders match a site you can realistically reach.",
  },
  oregon: {
    slug: "oregon",
    timezoneNote: "Pacific Time for most of the state, with most of Malheur County in the east on Mountain Time",
    climateBand: "pacific-nw",
    geographyNote:
      "Oregon's Cascade Range splits a green, rainy west from a drier high-desert east. Portland, Salem, and Eugene all line the Willamette Valley, with the Columbia River Gorge to the north and the Pacific shore to the west.",
    intakeNote:
      "Most of Oregon is one hour behind Boulder on Pacific Time, but a slice of the far east matches Mountain Time. Eastern Oregon patients should say which clock they use.",
    labNote:
      "Portland, Salem, and Eugene line the Willamette Valley with commercial draw sites, while coastal and eastern Oregon patients may travel farther across the Cascades or high desert. The office confirms a location that makes sense for your road conditions.",
  },
  pennsylvania: {
    slug: "pennsylvania",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "Pennsylvania has the Appalachian ridges running through its middle, with Philadelphia on the Delaware River in the east and Pittsburgh where the Allegheny and Monongahela rivers form the Ohio in the west. Harrisburg sits on the Susquehanna River.",
    intakeNote:
      "Pennsylvania is on Eastern Time, two hours ahead of Boulder. Patients traveling across the state for work can pick the slot that falls at a stable place.",
    labNote:
      "Philadelphia, Pittsburgh, and Harrisburg have many commercial draw sites, and patients in ridge-and-valley towns may rely on a regional center. The office confirms the site that fits your commute and your calendar.",
  },
  "rhode-island": {
    slug: "rhode-island",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "Rhode Island is the smallest state by area, built around Narragansett Bay. Providence sits at the head of the bay, and Cranston and Warwick are neighboring cities just to its south.",
    intakeNote:
      "Rhode Island is two hours ahead of Boulder on Eastern Time. Distances are short, so there is rarely a reason a lab visit cannot fit around the video visit.",
    labNote:
      "Providence, Cranston, and Warwick are close together, and a commercial draw site is rarely far from anyone in a state this small. The office confirms a location that suits your schedule.",
  },
  "south-carolina": {
    slug: "south-carolina",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "humid-south",
    geographyNote:
      "South Carolina runs from the Lowcountry coast around Charleston through the Midlands to the foothills of the Blue Ridge in the Upstate. Columbia, the capital, lies in the center, and Greenville is in the northwest.",
    intakeNote:
      "South Carolina is on Eastern Time, two hours ahead of Boulder. Lowcountry patients should keep hurricane-season disruptions in mind when picking a back-up plan.",
    labNote:
      "Columbia, Charleston, and Greenville anchor commercial lab access, and Lowcountry and rural patients may travel to a regional hub. Storm-season disruptions can affect travel, so mention that when you plan a draw.",
  },
  "south-dakota": {
    slug: "south-dakota",
    timezoneNote: "Central Time in the east and Mountain Time in the west",
    climateBand: "cold-north",
    geographyNote:
      "South Dakota is divided by the Missouri River into an eastern farmland half and a western half that holds the Black Hills and the Badlands. Sioux Falls is in the southeast, Rapid City lies at the edge of the Black Hills, and Pierre is the capital on the Missouri.",
    intakeNote:
      "South Dakota is split between Central and Mountain Time, with Sioux Falls one hour ahead of Boulder and Rapid City matching it. Tell the office which side of the river you live on.",
    labNote:
      "Sioux Falls, Rapid City, and Pierre have commercial draw sites, but distances between them are long, especially for patients west of the Missouri River. The office confirms a site you can reach in your season.",
  },
  tennessee: {
    slug: "tennessee",
    timezoneNote: "Eastern Time in the east and Central Time in the middle and west",
    climateBand: "humid-south",
    geographyNote:
      "Tennessee is a long east-west state running from the Great Smoky Mountains near Knoxville across the Cumberland Plateau and Nashville Basin to the Mississippi River at Memphis. Nashville sits on the Cumberland River.",
    intakeNote:
      "Tennessee is split between Eastern and Central Time. Knoxville is two hours ahead of Boulder, while Nashville and Memphis are one hour ahead.",
    labNote:
      "Nashville, Memphis, and Knoxville have many commercial draw sites, and Cumberland Plateau and mountain patients may drive to a regional hub. The office confirms a location that fits your address.",
  },
  texas: {
    slug: "texas",
    timezoneNote: "Central Time for most of the state and Mountain Time in the far west around El Paso",
    climateBand: "humid-south",
    geographyNote:
      "Texas is large enough to feel like several regions: humid Gulf Coast around Houston, rolling Hill Country near Austin, open plains in the north around Dallas, and drier desert and mountain terrain far to the west.",
    intakeNote:
      "Most of Texas is one hour ahead of Boulder on Central Time, but the far west shares Boulder Mountain Time. Long distances within the state mean you should confirm your own zone with the office.",
    labNote:
      "Houston, Dallas, and Austin each have a large field of commercial draw sites, while patients in West Texas or the Panhandle may drive a long way to one. Because Texas distances vary so much, the office asks exactly where you live before orders are placed.",
  },
  utah: {
    slug: "utah",
    timezoneNote: "Mountain Time for the whole state, the same as Boulder",
    climateBand: "mountain-west",
    geographyNote:
      "Utah has the Wasatch Front, where most people live, backed by high mountains; red-rock canyon country to the south; and the Great Salt Lake to the northwest. Salt Lake City and West Valley City share the valley, and Provo lies to the south beside Utah Lake.",
    intakeNote:
      "Utah shares Mountain Time with Boulder, so there is no conversion at all. If you are in a canyon town, test your connection before the video visit.",
    labNote:
      "Salt Lake City, West Valley City, and Provo share the Wasatch Front, where commercial draw sites are plentiful, while southern Utah canyon country may involve a long drive. The office confirms a location that fits your travel.",
  },
  vermont: {
    slug: "vermont",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "cold-north",
    geographyNote:
      "Vermont is a small, mountainous state with the Green Mountains running north to south and Lake Champlain along its western border. Burlington is the largest city, Montpelier is one of the smallest state capitals in the country, and Rutland sits in the south-central part.",
    intakeNote:
      "Vermont is on Eastern Time, two hours ahead of Boulder. Hilltop homes with spotty internet should plan a backup, such as phone contact.",
    labNote:
      "Burlington, Montpelier, and Rutland have commercial draw sites, and hill-town patients may drive to a regional center. The office confirms a site that works, with winter roads in mind.",
  },
  virginia: {
    slug: "virginia",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "humid-south",
    geographyNote:
      "Virginia runs from the Tidewater and Hampton Roads coast near Virginia Beach and Norfolk through the Piedmont around Richmond to the Blue Ridge and Shenandoah Valley. The southwest corner is Appalachian mountain country.",
    intakeNote:
      "Virginia is on Eastern Time, two hours ahead of Boulder. Patients in the Virginia Beach area with shift schedules can ask for a window that matches their off hours.",
    labNote:
      "Virginia Beach, Richmond, and Norfolk have many commercial draw sites, and Blue Ridge and southwest Virginia patients may drive farther. The office confirms a location that suits your address and schedule.",
  },
  washington: {
    slug: "washington",
    timezoneNote: "Pacific Time for the whole state",
    climateBand: "pacific-nw",
    geographyNote:
      "Washington is divided by the Cascade Range into a wet, forested west around Puget Sound and a much drier east. Seattle and Tacoma sit on the Sound, Olympia is at the southern tip, and Spokane is in the east.",
    intakeNote:
      "Washington is on Pacific Time, one hour behind Boulder. Seattle commuters may find a Mountain Time midday slot easier than a late one.",
    labNote:
      "Seattle, Spokane, and Tacoma have commercial draw sites in and around them, while patients on the peninsula, islands, or in eastern Washington may travel farther. The office confirms a site that fits, including ferry or pass considerations.",
  },
  "west-virginia": {
    slug: "west-virginia",
    timezoneNote: "Eastern Time for the whole state",
    climateBand: "northeast",
    geographyNote:
      "West Virginia is mountains from border to border, cut by deep river valleys like the Kanawha and the New River Gorge. Charleston sits on the Kanawha, Huntington lies on the Ohio River, and Morgantown is near the Pennsylvania line.",
    intakeNote:
      "West Virginia is two hours ahead of Boulder on Eastern Time. Hollow-and-ridge terrain can mean weak signals, so check your connection beforehand.",
    labNote:
      "Charleston, Huntington, and Morgantown have commercial draw sites, and patients in remote hollows may drive a long way on mountain roads. The office confirms a location you can reach reliably.",
  },
  wisconsin: {
    slug: "wisconsin",
    timezoneNote: "Central Time for the whole state",
    climateBand: "cold-north",
    geographyNote:
      "Wisconsin has shorelines on both Lake Michigan and Lake Superior, with dairy farmland and northern forest in between. Milwaukee is on Lake Michigan, Madison sits on an isthmus between two lakes, and Green Bay lies at the southern end of Green Bay.",
    intakeNote:
      "Wisconsin is on Central Time, one hour ahead of Boulder. Lake-country patients in the north should keep a backup phone contact for winter outages.",
    labNote:
      "Milwaukee, Madison, and Green Bay have commercial draw sites in and near them, and patients in the northwoods may drive far. Tell the office how winter travel looks for you so orders match a realistic location.",
  },
  wyoming: {
    slug: "wyoming",
    timezoneNote: "Mountain Time for the whole state, the same as Boulder",
    climateBand: "mountain-west",
    geographyNote:
      "Wyoming is high plains and Rocky Mountains, with Yellowstone and Grand Teton in the northwest. Cheyenne sits in the southeast corner near the Colorado line, Casper lies on the North Platte River, and Laramie is a high-plains town.",
    intakeNote:
      "Wyoming shares Mountain Time with Boulder, so scheduling is clock-for-clock. Long highway distances are the main logistics concern.",
    labNote:
      "Cheyenne, Casper, and Laramie have commercial draw sites, but towns in Wyoming can be separated by long stretches of highway. The office confirms a location that works with your distance and weather.",
  },
};
