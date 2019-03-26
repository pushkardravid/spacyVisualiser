let sample_1 = "Good evening.  On Wednesday, 14 Americans were killed as they came together to celebrate the holidays.  They were taken from family and friends who loved them deeply. They were white and black; Latino and Asian; immigrants and American-born; moms and dads; daughters and sons.  Each of them served their fellow citizens and all of them were part of our American family.Tonight, I want to talk with you about this tragedy, the broader threat of terrorism, and how we can keep our country safe.The FBI is still gathering the facts about what happened in San Bernardino, but here is what we know.  The victims were brutally murdered and injured by one of their coworkers and his wife.  So far, we have no evidence that the killers were directed by a terrorist organization overseas, or that they were part of a broader conspiracy here at home.  But it is clear that the two of them had gone down the dark path of radicalization, embracing a perverted interpretation of Islam that calls for war against America and the West.  They had stockpiled assault weapons, ammunition, and pipe bombs.  So this was an act of terrorism, designed to kill innocent people.Our nation has been at war with terrorists since al Qaeda killed nearly 3,000 Americans on 9/11.  In the process, we’ve hardened our defenses -- from airports to financial centers, to other critical infrastructure.  Intelligence and law enforcement agencies have disrupted countless plots here and overseas, and worked around the clock to keep us safe.  Our military and counterterrorism professionals have relentlessly pursued terrorist networks overseas -- disrupting safe havens in several different countries, killing Osama bin Laden, and decimating al Qaeda’s leadership.Over the last few years, however, the terrorist threat has evolved into a new phase.  As we’ve become better at preventing complex, multifaceted attacks like 9/11, terrorists turned to less complicated acts of violence like the mass shootings that are all too common in our society.  It is this type of attack that we saw at Fort Hood in 2009; in Chattanooga earlier this year; and now in San Bernardino.  And as groups like ISIL grew stronger amidst the chaos of war in Iraq and then Syria, and as the Internet erases the distance between countries, we see growing efforts by terrorists to poison the minds of people like the Boston Marathon bombers and the San Bernardino killers."

let sample_2 = "Parents need to know that Avengers: Infinity War is the most intense of the Marvel Cinematic Universe films so far, due to the villain's genocidal quest and the grave consequences for some well-known characters. It has plenty of humor and lighter moments, but it ultimately goes to places darker than in any previous Marvel Cinematic Universe entry. Also, it requires more knowledge of things that have happened in previous Marvel movies than other Avengers films have; it's the meeting point of several franchises and storylines. Violence is the biggest issue; it's stepped up even by MCU standards, with some torture and several impalings and crushings in addition to the usual smashed buildings, giant fights, and blasted spaceships. Thanos (Josh Brolin) is by far the most powerful nemesis the Avengers have faced, which the filmmakers establish right away with his brutal beatdown of one of the mightiest Avengers. The key plot element is mass murder on a universal scale, which might be a little much for younger viewers. Frankly, things get pretty grim: Key characters die, and the villains are much scarier than most comic book baddies. The gore level isn't higher; it's really the emotional impact that's different. There's also some strong language, but sex isn't a factor beyond a few loving kisses. As always, teamwork and courage are core messages as the Avengers (including Robert Downey, Jr.'s Iron Man, Chris Evans' Captain America, Chris Hemsworth's Thor, and Scarlett Johansson's Black Widow), other MCU heroes (including Chadwick Boseman's Black Panther, Tom Holland's Spider-Man, and Benedict Cumberbatch's Doctor Strange), and the Guardians of the Galaxy (including Chris Pratt's Star-Lord and Zoe Saldana's Gamora) come together to defend humanity -- and the universe.";

let sample_3 = "At Mobile World Congress in Barcelona today, Google launched version 1.2 of Flutter, its open source mobile UI framework that helps developers build native interfaces for Android and iOS. The company also previewed a new web-based suite of programming tools called Dart DevTools to help Flutter developers debug and analyze their apps.Flutter was first announced as an early alpha at Google’s I/O developers conference in May 2017 and then went through five more previews before its version 1.0 release in December 2018. Meant to compete with frameworks like Facebook’s React Native, the library is designed to combine the performance and platform integrations of native mobile with the rapid development and multi-platform reach of portable UI toolkits. Flutter apps are built using Google’s Dart programming language.";

var service_response = {};

function colorCode(text, tag) {
	let mark = document.createElement('mark');
	mark.setAttribute('class', 'mark-class ' + tag);
	let span = document.createElement('span');
	span.setAttribute('class', 'span-class');
	span.innerHTML = tag;
	mark.innerHTML = text;
	mark.appendChild(span);
	return mark;
}

function colorCodeTag(tag) {
	let div = document.createElement('div');
	div.setAttribute('class', 'mark-class-round text-center ' + tag);
	div.setAttribute('id', tag);
	div.setAttribute('onclick', 'filterEntity(this.id)');
	let span = document.createElement('span');
	span.setAttribute('class', 'span-class');
	span.innerHTML = tag;
	div.appendChild(span);
	return div;
}

function filterEntity(id) {
	entities = service_response['tagged_entities'];
	selected_entities = entities.filter(function (entity) {
		return entity['label'] == id;
	});
	var elem = document.getElementById('tagged_text');
	elem.innerHTML = '';
	let final = document.createElement('p');
	selected_entities.forEach(function (selected_entity) {
		let node = colorCode(selected_entity['text'], selected_entity['label']);
		final.appendChild(node);
	});
	elem.appendChild(final);

}

function processResponse(response) {
	var resp = response['tagged_entities'];
	var tags = response['tags'];
	var start = 0;
	var final = document.createElement('p');
	final.setAttribute('class', 'justify');

	if (resp.length == 0) {
		var plainText = document.createElement('span');
		plainText.innerHTML = text;
		final.appendChild(plainText);
	} else {
		for (var i = 0; i < resp.length; i++) {
			plain_text = text.slice(start, resp[i]['start'])
			start = resp[i]['end']
			var plainText = document.createElement('span');
			plainText.innerHTML = plain_text;
			final.appendChild(plainText);
			tagged_text = '*' + resp[i]['text'] + '*'
			final.appendChild(colorCode(resp[i]['text'], resp[i]['label']));

		}
		if ((resp[(resp.length - 1)]['end']) != (text.length - 1)) {
			var plainText = document.createElement('span');
			plainText.innerHTML = text.slice((resp[resp.length - 1]['end']), (text.length));
			final.appendChild(plainText);
		}
	}
	var elem = document.getElementById('tagged_text');
	elem.innerHTML = '';
	elem.appendChild(final);

	var tagsDiv = document.getElementById('tags');
	tagsDiv.innerHTML = '';
	tagsDiv.innerHTML = '<h5 class="text-center">Legend</h5><hr/>';
	tags.forEach(function (tag) {
		var tagElement = colorCodeTag(tag);
		tagsDiv.appendChild(tagElement);
	});
}

function analyse() {
	var lib = document.getElementById('medacyChecker').checked;
	if(lib){
		var uri = '/nerMedical';
	}
	else{
		var uri = '/ner';
	}
	text = document.getElementById('comment').value;
	var data = JSON.stringify({
		"text": text
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			var response = JSON.parse(this.responseText);
			service_response = response;
			processResponse(response);
		}
	});

	xhr.open("POST", uri);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(data);
}

function loadSample1() {
	document.getElementById('comment').value = sample_1;
}

function loadSample2() {
	document.getElementById('comment').value = sample_2;
}

function loadSample3() {
	document.getElementById('comment').value = sample_3;
}