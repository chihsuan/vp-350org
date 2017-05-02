/*
  It's all by  `canner-core` to transform
*/
var route = [
  {
    data: {
      path: './',
      country: 'Vietnam',
      center: [106.5, 16],
      scale: 1900,
      mobileScale: 1100,
      plantFile: './data/Japan&Vietnam.csv',
      financierFile: './data/Database- VN - Project 2.csv',
      intro: {
        coverImg: './img/vietnam_story.png',
        text: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam.'
      },
      stories: [
        {
          isVideo: true,
          title: 'People’s Climate March in Vietnam: Coal Kills People and the Planet',
          mediaUrl: 'https://www.youtube.com/embed/C52rGFuJ8mA',
          content: '(September 26, 2014) In Ho Chi Minh City, Danang, Hanoi and Can Tho of Vietnam, young organisers worked with artist groups on a creative action “September Black Day”: Human statues, body painted in black, wearing coal masks, stood in the cities’ busiest public places like April 30th Park, Notre Dame Cathedral, Central Post Office… to get attention of local people and tourists, to raise the awareness about the negative impacts of coal on the human and environmental health.'
        },
        {
          isVideo: false,
          title: '“Don’t let coal pollution destroy your life”: Vietnamese artists say “I can’t” to coal pollution',
          linkUrl: 'http://world.350.org/east-asia/vietnamese-artists-say-i-cant-to-coal-pollution/',
          mediaUrl: './img/image2.png',
          content: '(April 1, 2017) Eight renowned Vietnamese singers, artists and actors supported “ I Can’t campaign” launched in HO CHI MINH City on April 1, 2016 by emphasizing “Don’t let coal pollution destroy your life.” They are transformed into different characters wearing gas masks to demonstrate the struggle they will have to go through in a coal-polluted Vietnam. These photos portrayed the deadly impacts of emission from coal-fired power plants on daily life.'
        },
        {
          isVideo: true,
          title: 'DOCUMENTARY "HON CAU MPA UNDER THREATS FROM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/5p-Fjru1DEQ',
          content: 'The documentary “Hon Cau MPA under threats from coal power” was filmed at the communes Vinh Tan, Phuoc The, Vinh Hao, Ca Nha and the Hon Cau MPA. The clip introduces the important location of Hon Cau MPA, the native marine biodiversity with high scientific and economical values to the locals; and threats of coal power (through operation, discharge and dredging) to the MPA and to local livelihoods (fishing, salt, aquaculture etc.) This is a call to protect Hon Cau MPA from coal power impacts'
        }
      ]
    },
    partials: './partial.js',
    layout: './layout/index.hbs',
    filename: './vietnam.html'
  },
  {
    data: {
      path: './',
      country: 'Taiwan',
      center: [121, 23.7],
      scale: 5000,
      mobileScale: 4500,
      plantFile: './data/Database- TW - Project TW 1.csv',
      financierFile: './data/Database- VN - Project 2.csv',
      intro: {
        coverImg: './img/image16.png',
        text: 'In 2014, PM 2.5 alone caused more than 6,000 deaths in Taiwan.'
      },
      stories: [
        {
          isVideo: false,
          title: 'New turning point to phase out fossil fuels in Taiwan – Anti-air pollution',
          mediaUrl: './img/taiwan_story_1.jpg',
          linkUrl: 'https://gofossilfree.org/taiwan/219-march-on-spot/',
          content: 'It has been over a week since the 219 Anti-Air Pollution March drew to a close. The government has responded to the people’s appeal by promising its determination to cooperate with the corporates and the public on anti-air pollution and against global warming. However, the government also declared it would take time to make a change. On the day of the March, tens of thousands of people were on the streets of Taichung and Kaohsiung, voicing their discontent of the inequality of air-breathing quality in result of health comparing with those living in northern Taiwan, where air pollution is not as serious a problem. There were even many political figures and scholars participated in and endorsed for the March.'
        },
        {
          isVideo: false,
          title: 'SOUTH WINDS',
          linkUrl: 'http://southwind.nmns.edu.tw/',
          mediaUrl: './img/image18.png',
          content: 'My ancestors told us that if you have your fields and the sea, you will never go hungry. Since the Sixth Naphtha Cracking Plant has come, we don\'t have anything," a Taiwanese fisherman helpless expressed. The 398 smokestacks of the Sixth Naphtha Cracking Plant in Mailiao Township, just across the Zhuoshui River that began operating in 1998. Every summer, when the "south wind" blows fumes from these smokestacks are sent northward to Taixi Village. The residents of this village not only have to put up with the foul odor, but also face health risks from harmful air pollutants.'
        },
        {
          isVideo: true,
          title: 'DOCUMENTARY "HON CAU MPA UNDER THREATS FROM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/5p-Fjru1DEQ',
          content: 'The documentary “Hon Cau MPA under threats from coal power” was filmed at the communes Vinh Tan, Phuoc The, Vinh Hao, Ca Nha and the Hon Cau MPA. The clip introduces the important location of Hon Cau MPA, the native marine biodiversity with high scientific and economical values to the locals; and threats of coal power (through operation, discharge and dredging) to the MPA and to local livelihoods (fishing, salt, aquaculture etc.) This is a call to protect Hon Cau MPA from coal power impacts'
        }
      ]
    },
    partials: './partial.js',
    layout:  "./layout/index.hbs",
    filename: "./taiwan.html"
  },
  {
    data: {
      path: './',
      country: 'South Korea',
      center: [127.9, 36],
      scale: 3500,
      mobileScale: 2200,
      plantFile: './data/Database- SK - Project SK 1.csv',
      financierFile: './data/Database- VN - Project 2.csv',
      intro: {
        coverImg: './img/image17.png',
        text: '“Climate change isn’t just a problem of an individual, city or a country, but it matters to all of us. That’s why I decided to stand up together with other people.” ～ Yeon-ju Seo, a mother of a nine-month-old girl from Gyeonggi Province, said.'
      },
      stories: [
        {
          isVideo: false,
          title: 'Particulate Matter from Coal Power Plants',
          mediaUrl: './img/image12.png',
          content: "Korea is suffering from particulate matter particularly this spring. People cannot go outside without wearing a mask, and for sure, mothers cannot bring their babies outside for a walk. Coal power plants are responsible for these particulate matters. According to the Ministry of Environment of South Korea, power plants directly account for 14% of the domestic sources of PM 2.5. However, what is important is that NOx and SOx in the air cause chemical reactions to generate 'secondary particulate matter’. Although the secondary particulate matter contributes a great deal, the problem is that it is not easy to collect statistics properly."
        },
        {
          isVideo: true,
          title: 'People’s Climate March in Seoul: We want climate justice. We must do action, not just words. We are unstoppable, another world is impossible!',
          mediaUrl: 'https://www.youtube.com/embed/y-hVT9zn9tw',
          content: '(September 21, 2014) “We support Ban Ki Moon UN Climate Summit and hope they raise the political will for planet Earth and for the people and draw meaningful and practical outcome!” Around 70 people gathered together to join this march. It was the first climate march held in Seoul on September 21st to support Ban ki moon UN climate summit on September 23rd.The march was not only for the summit but also for all people who live in south Korea and all people all around the world.'
        },
        {
          isVideo: false,
          title: 'Anti-coal protests force Korea Eximbank to withdraw from Green Climate Fund',
          mediaUrl: './img/image11.png',
          linkUrl: 'http://world.350.org/east-asia/anti-coal-protest-in-the-philippines-forces-korea-eximbank-to-withdraw-from-green-climate-fund/',
          content: 'Export-Import Bank of korea’s (KEXIM) applied to be accredited to receive money from Green Climate Fund (GCF), a global fund under the auspices of the UN climate pact allocated for low-emission and climate-resilient development, despite its massive funding for coal power plant projects in the Philippines (206-megawatt coal plant in Naga, Cebu) and around the world (USD 3.8 billion) in 2007-2014. It became the world’s fifth largest financial institution in public finance for coal. Protests in the Philippines, South Korea and other countries against the KEXIM funding for coal projects have forced the latter’s withdrawal from the GCF.'
        }
      ]
    },
    partials: './partial.js',
    layout: './layout/index.hbs',
    filename: './south korea.html'
  },
  {
    data: {
      path: './',
      country: 'Japan',
      center: [139.4, 38],
      scale: 1600,
      mobileScale: 740,
      plantFile: './data/Database- JP - Project JP 1.csv',
      financierFile: './data/Database- VN - Project 2.csv',
      intro: {
        coverImg: './img/image14.png',
        text: 'Once Japan withdrawal its investment in coal, the sky over East Asia became crystal clear.'
      },
      stories: [
        {
          isVideo: true,
          title: 'Divestment in Japan: DAI-VESTO-MENTO!',
          mediaUrl: 'https://www.youtube.com/embed/EdSb6maZhPM',
          content: '(October 6, 2016) Record-breaking torrential rain in the southern parts of Japan, scorching temperatures that led to water limits in the east, including the capital area around Tokyo, and a number of record-breaking typhoons hit Japan. The simple truth of causing such abnormal weather patterns is betrayed by opaque media coverage and, as a result, less and less obvious to the Japanese public. This 3 minutes quirky video answered this ugly truth. Your money is actually propelling the climate crisis. Also, your money is being funneled into unsustainable energy, including climate change-driving fossil fuels. It can be changed by join Divestment movement.'
        },
        {
          isVideo: false,
          title: 'KEPCO cancelled Ako coal projects: First cancellation of coal plant since new projects emerged these years',
          mediaUrl: './img/image10.png',
          linkUrl: 'http://world.350.org/east-asia/kepco-cancels-coal-power-project-in-hyogo/',
          content: '(January 31, 2017) Kansai Electric Power Company (KEPCO) announced cancellation of Ako power plant located in Ako city, Hyogo. The reason for their decision is the fall in electricity demand due to energy saving and energy efficiency improvements, and the requirement to strengthen its CO2 reduction measures. Since this plant, has been constructed, criticism from local residents has been on the rise. Ako coal plant’s cancellation became the first case since new coal projects emerged last few years, up to 48 units. Besides this case, there are other 45 coal power projects in Japan has been cancelled.'
        },
        {
          isVideo: false,
          title: 'Developers Announced the Cancellation of New Coal Power Project in Ichihara, Chiba',
          linkUrl: 'http://world.350.org/east-asia/developers-announced-the-cancellation-of-new-coal-power-project-in-ichihara-chiba/',
          mediaUrl: './img/image7.png',
          content: '(March 23, 2017) On March 23rd, Tonen General Sekiyu and Kanden Energy Solution Co. (KENES) announced to cancel the plan to build a 1,000-megawatt coal-fired power plant. According to the release, Tonen General Sekiyu and Kanden Energy Solution Co. decided not to consider the commercialization of the project based on the “changes in the feasibility and the surrounding environment”. Among the 49 units under plan since 2012, this became the second case of cancellation since Kansai Electric Power Company (KEPCO) announced to cancel the retrofit project of Ako power plant in Hyogo in January 2017. This became the first case of cancellation on a new construction project.'
        }
      ]
    },
    partials: './partial.js',
    layout: './layout/index.hbs',
    filename: './japan.html'
  },
  {
    data: {
      path: './',
      country: 'Philippines',
      center: [122.5, 12.5],
      scale: 2000,
      mobileScale: 1100,
      plantFile: './data/Database- PH - Project PH 1.csv',
      financierFile: './data/Database- VN - Project 2.csv',
      intro: {
        coverImg: './img/image8.png',
        text: 'The most to lose and little to gain People from the Philippines have shown that it is possible to stop the world’s biggest bankrollers of climate change.'
      },
      stories: [
        {
          isVideo: true,
          title: 'We stand with Bataan in saying no to coal.',
          mediaUrl: 'https://www.youtube.com/embed/gQt_idMCMJA',
          content: 'Solar and wind energy are now at the same price or even cheaper than new fossil fuels in over 30 countries, according to the World Economic Forum. It is both ironic and tragic then that companies like SMC Consolidated Power Corporation (SMCCPC) continue to operate destructive coal plants and dump bottom ash harmful to nearby communities, such as in Limay, Bataan. Therefore, the Environmental Management Bureau in Central Luzon has already ordered SMCCPC to stop any activity inside its coal plant in the wake of the ash spill that has caused several residents in the nearby communities to fall ill.'
        },
        {
          isVideo: false,
          title: 'The Energy Revolution will be people powered',
          linkUrl: 'https://350.org/the-energy-revolution-will-be-people-powered/',
          mediaUrl: './img/image1.png',
          content: '(March 27, 2017) In 2016, anti-coal communities converged in Batangas City to advance their demand for the cancellation of all plans, permits and construction of coal-fired power plants in Batangas and the rest of the country. Around 10,000 people took to the streets under the banner of Piglas Pilipinas! The event was monumental because it was the biggest act of public protest against coal plants in the Philippines, which made the growing resistance against fossil fuels reach national consciousness. The result was a series of policy momentum that materialized into the Philippines’ ratification of the Paris Agreement in spite of the initial delays driven by Duterte’s hesitation to sign it.'
        },
        {
          isVideo: false,
          title: 'Going beyond resilience',
          linkUrl: 'https://350.org/the-brewing-storm-of-inaction/',
          mediaUrl: './img/image13.png',
          content: 'In Tuguegarao, Cagayan, the storm’s strong winds blew the destroying homes, bringing down power lines and felling trees, which rendered some roads impassable because of the debris. President Rodrigo Duterte rightfully blamed rich and industrialized nations for harmful emissions that have led to climate change and extreme weather disturbances. But he refused to reduce Philippines’ emission due to economic development and industrialization. He also signaled that the Philippines would not be ratifying the Paris Agreement. However, climate change does not recognize geopolitical borders nor interest. The Philippine government should have assert a place for itself at the negotiating table by ratifying the Paris Agreement and take action against carbon emission.'
        }
      ]
    },
    partials: './partial.js',
    layout: './layout/index.hbs',
    filename: './philippines.html'
  },
  {
    data: {
      path: './',
      country: 'Indonesia',
      center: [119.5, 3],
      scale: 1000,
      mobileScale: 350,
      plantFile: './data/Database- IN - Project IN 1.csv',
      financierFile: './data/Database- VN - Project 2.csv',
      intro: {
        coverImg: './img/vietnam_story.png',
        text: 'Indonesia, one of the world’s largest producers and exporters of coal. Black clouds cover over Indonesia due to Japanese coal finance'
      },
      stories: [
        {
          isVideo: false,
          title: 'Indonesian farmers and fishermen deliver a clear message to Japan: Stop funding dirty coal',
          mediaUrl: './img/image6.png',
          linkUrl: 'http://world.350.org/east-asia/indonesian-farmers-and-fishermen-deliver-a-clear-message-to-japan-stop-funding-dirty-coal/',
          content: '(March 27, 2017) In 2017 March, a group of Indonesian residents and activists were in Japan to demand that the Japanese Government and banks do not finance the Indramayu coal power plant expansion project (1000MW) and Cirebon 2 coal-fired power plant project (1000MW), located in West Java. If completed, these planned projects would add a further 2000 MW of polluting coal power capacity, further increasing hardship on local villagers and go against both Indonesia and Japan’s commitments to reduce carbon emissions in line with the Paris Agreement.'
        },
        {
          isVideo: false,
          title: 'The big polluters’ thirst for gain has nothing compared to the peoples’ courage',
          linkUrl: 'http://world.350.org/east-asia/the-big-polluters-thirst-for-gain-has-nothing-compared-to-peoples-courage/',
          mediaUrl: './img/image15.png',
          content: '(January 15, 2017) A community in Cirebon is fighting to stop a coal plant. Cirebon are 2 of about 109 that are proposed to bring 35,000 MW of coal online in Indonesia. These projects have lots of support from the government where environmental impact assessments are being waved aside, and lots of financing from investors, particularly in Japan. Take Cirebon for example, this place is famous for a type of shrimp paste–trasi. Trasi is to Cirebon as croissants are to Paris. The trouble is, the coal plant is situated right on the water, and once it was built, fishermen no longer had full nets of shrimp.'
        },
        {
          isVideo: true,
          title: 'WALHI’s footage - DISASTROUS COAL CIREBON',
          mediaUrl: 'https://www.youtube.com/embed/oa-n1jlgVMA',
          content: '(November 29, 2016) Carbon I coal power plant has shaken the social economy structure and environment. “Water taste like medicine and smell like coal.” Residents suffered from the water pollution. "Fish amount decreased to nothing” Coastal fishermen complained. “Salt contaminated by coal became black,” salt maker cried out. Finally, Kanji Villagers held a demonstration on October 28, 2016 shouting out their anger that “They must e responsible! We are four years as power plant victims!” The conflict of Carbon I coal power plant still continued.'
        }
      ]
    },
    partials: './partial.js',
    layout: './layout/index.hbs',
    filename: './indonesia.html'
  }
];
module.exports = route;
