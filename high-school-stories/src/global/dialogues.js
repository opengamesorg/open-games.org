/***********************************************
dialogues.js : Dialogues content and properties
***********************************************/

var Dialogues = [
	{
		interactiveId: 0,
		content: [
			{ 
				text: {
					en: "Alright, this high school looks pretty good. Let's take advantage of the open day to find out more.",
					fr: "Bon, il a l'air pas mal ce lycée. Je vais profiter de cette journée portes ouvertes pour me renseigner.",
				},
			},
		],
	},
	{
		interactiveId: 1,
		content: [
			{ 
				text: {
					en: '"Welcome to High School! All the staff is at your disposal."',
					fr: '"Bienvenue au lycée! Tout le personnel se tient à votre disposition."',
				},
			},
		],
	},
	{
		interactiveId: 2,
		content: [
			{ 
				text: {
					en: '"Infirmary"',
					fr: '"Infirmerie"',
				},
			},
		],
	},
	{
		interactiveId: 3,
		content: [
			{ 
				text: {
					en: '"Principal\'s office : Mr. Bouvier"',
					fr: '"Bureau du principal : M. Bouvier"',
				},
			},
		],
	},
	{
		interactiveId: 4,
		content: [
			{ 
				text: {
					en: '"For the second consecutive year, our school won the regional table tennis championship."',
					fr: '"Pour la deuxième année consécutive, notre école a gagné le championnat régional de tennis de table."',
				},
			},
		],
	},
	{
		interactiveId: 5,
		content: [
			{
				text: {
					en: '"Class A : Ms. Casanova"',
					fr: '"Classe A : Mme Casanova"',
				},
			},
		],
	},
	{
		interactiveId: 6,
		content: [
			{ 
				text: {
					en: '"Election of the student representative : Marjorie obtains the majority of the votes."',
					fr: '"Election du représentant des élèves : Marjorie obtient la majorité des votes."',
				},
			},
		],
	},
	{
		interactiveId: 7,
		content: [
			{
				text: {
					en: '"Class B : Mr. Hubert"',
					fr: '"Classe B : M. Hubert"',
				},
			},
		],
	},
	{
		interactiveId: 8,
		branches: [
			{
				id: 0,
				content: [
					{
						text: {
							en: "Hello and welcome to our establishment. Do not hesitate to discuss with the teachers.",
							fr: "Bonjour et bienvenue dans notre établissement. N'hésitez pas à discuter avec les enseignants.",
						},
						next: {
							branchId: 1,
							direct: false
						},
					},
				],
			},
			{
				id: 1,
				content: [
					{
						text: {
							en: "Is everything going well?",
							fr: "Tout se passe bien?",
						},
					},
				],
			},
		],
	},
	{
		interactiveId: 9,
		branches: [
			{
				id: 0,
				content: [
					{
						text: {
							en: "I am Ms. Casanova. I take care of class A, the class for the gifted.",
							fr: "Je suis Madame Casanova. Je m'occupe de la classe A, la classe des surdoués.",
						},
					},
					{
						text: {
							en: "...",
							fr: "...",
						},
					},
					{
						text: {
							en: "You don't look very smart, you will probably be assigned to class B.",
							fr: "Vous n'avez pas l'air très intelligent, vous serez sans doute affecté à la classe B.",
						},
						next: {
							branchId: 1,
							direct: false
						},
					},
				],
			},
			{
				id: 1,
				content: [
					{
						text: {
							en: "What are you staring at?",
							fr: "Vous voulez ma photo?",
						},
					},
				],
			},
		],
	},
	{
		interactiveId: 10,
		branches: [
			{
				id: 0,
				content: [
					{
						text: {
							en: "All students will have a locker, with its own key. This is so cool!!",
							fr: "Tous les élèves vont avoir un casier, avec sa propre clé. C'est trop cool!!",
						},
						next: {
							branchId: 1,
							direct: false
						},
					},
				],
			},
			{
				id: 1,
				content: [
					{
						text: {
							en: "Don't you think it's cool to have a locker??",
							fr: "Tu trouves pas ça trop cool d'avoir un casier??",
						},
					},
				],
			},
		],
	},
	{
		interactiveId: 11,
		branches: [
			{
				id: 0,
				content: [
					{
						text: {
							en: "Hi, I'm Jordan, nice to meet you! What's your name?",
							fr: "Salut, moi c'est Jordan, enchanté! Tu t'appelles comment?",
						},
						choices: [
							{ 
								text: {
									en: "Brandon.",
									fr: "Brandon.",
								},
								next: {
									branchId: 1,
									direct: true
								},
							},
							{ 
								text: {
									en: "Uh, that's none of your business.",
									fr: "Euh, ça ne te regarde pas.",
								},
								next: {
									branchId: 2,
									direct: true
								},
							},
						],
					},
				],
			},
			{
				id: 1,
				content: [
					{
						text: {
							en: "Will you be in class B too? I wonder why the entire lower part is under construction...",
							fr: "Tu seras en classe B toi aussi? Je me demande pourquoi toute la partie inférieure est en travaux...",
						},
						next: {
							branchId: 3,
							direct: false
						},
					},
				],
			},
			{
				id: 2,
				content: [
					{
						text: {
							en: "...",
							fr: "...",
						},
					},
					{
						text: {
							en: "Fine.",
							fr: "D'accord.",
						},
						next: {
							branchId: 4,
							direct: false
						},
					},
				],
			},
			{
				id: 3,
				content: [
					{
						text: {
							en: "I wonder why the entire lower part is under construction...",
							fr: "Je me demande pourquoi toute la partie inférieure est en travaux...",
						},
					},
				],
			},
			{
				id: 4,
				content: [
					{
						text: {
							en: "...",
							fr: "...",
						},
					},
				],
			},
		],
	},
	{
		interactiveId: 12,
		branches: [
			{
				id: 0,
				content: [
					{
						text: {
							en: "Hello and welcome among us. I am Mr. Hubert, class B teacher for over 20 years.",
							fr: "Bonjour et bienvenue parmi nous. Je suis Monsieur Hubert, professeur de la classe B depuis plus de 20 ans.",
						},
					},
					{
						text: {
							en: "Do you have any questions about our school?",
							fr: "Avez-vous des questions à propos de notre école?",
						},
						choices: [
							{ 
								text: {
									en: "No, thank you.",
									fr: "Non, merci.",
								},
								next: {
									branchId: 1,
									direct: true
								},
							},
							{ 
								text: {
									en: "Why are there renovation works?",
									fr: "Pourquoi y a-t-il des travaux?",
								},
								next: {
									branchId: 2,
									direct: true
								},
							},
						],
					},
				],
			},
			{
				id: 1,
				content: [
					{
						text: {
							en: "I hope you'll enjoy yourself here.",
							fr: "J'espère que vous vous plairez ici.",
						},
						next: {
							branchId: 3,
							direct: false
						},
					},
				],
			},
			{
				id: 2,
				content: [
					{
						text: {
							en: "The lower part must be rearranged because of... an incident. But I don't want to bore you with the details.",
							fr: "La partie inférieure doit être réaménagée suite à un... incident. Mais je ne veux pas vous ennuyer avec les détails.",
						},
						next: {
							branchId: 3,
							direct: false
						},
					},
				],
			},
			{
				id: 3,
				content: [
					{
						text: {
							en: "The start of the school year may be delayed because of the works...",
							fr: "La rentrée risque d'être retardée à cause des travaux...",
						},
					},
				],
			},
		],
	},
	{
		interactiveId: 13,
		branches: [
			{
				id: 0,
				content: [
					{
						text: {
							en: "This school is so weird... Did you talk to Ms. Casanova? She is really unpleasant!",
							fr: "Cette école est trop bizarre... Tu as parlé à Mme Casanova? Elle est vraiment désagréable!",
						},
						next: {
							branchId: 1,
							direct: false
						},
					},
				],
			},
			{
				id: 1,
				content: [
					{
						text: {
							en: "It sucks to be here...",
							fr: "Ça craint ici...",
						},
					},
				],
			},
		],
	},
];