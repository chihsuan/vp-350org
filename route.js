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
          title: 'WARNINGS FROM VIETNAM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/7VOi6Upnh3c',
          content: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam. Such is the case for Japanese investments in coal-fired thermal power that have devastated environmental and human health in Binh Thuan province of Vietnam. Yet money and corruption have long suppressed victims’ voices, while continuing to feed coal expansion and worsen climate change effects altogether. This documentary attempts to create a public platform that broadcasts the voices of coal victims in Binh Thuan, Vietnam.'
        },
        {
          isVideo: true,
          title: 'DOCUMENTARY "HON CAU MPA UNDER THREATS FROM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/5p-Fjru1DEQ',
          content: 'The documentary “Hon Cau MPA under threats from coal power” was filmed at the communes Vinh Tan, Phuoc The, Vinh Hao, Ca Nha and the Hon Cau MPA. The clip introduces the important location of Hon Cau MPA, the native marine biodiversity with high scientific and economical values to the locals; and threats of coal power (through operation, discharge and dredging) to the MPA and to local livelihoods (fishing, salt, aquaculture etc.) This is a call to protect Hon Cau MPA from coal power impacts'
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
    filename: "./vietnam.html"
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
        coverImg: './img/taiwan_cover.png',
        text: 'In 2014, PM 2.5 alone caused mroe than 6,000 deaths in Taiwan'
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
          isVideo: true,
          title: 'DOCUMENTARY "HON CAU MPA UNDER THREATS FROM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/5p-Fjru1DEQ',
          content: 'The documentary “Hon Cau MPA under threats from coal power” was filmed at the communes Vinh Tan, Phuoc The, Vinh Hao, Ca Nha and the Hon Cau MPA. The clip introduces the important location of Hon Cau MPA, the native marine biodiversity with high scientific and economical values to the locals; and threats of coal power (through operation, discharge and dredging) to the MPA and to local livelihoods (fishing, salt, aquaculture etc.) This is a call to protect Hon Cau MPA from coal power impacts'
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
        coverImg: './img/vietnam_story.png',
        text: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam.'
      },
      stories: [
        {
          isVideo: true,
          title: 'WARNINGS FROM VIETNAM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/7VOi6Upnh3c',
          content: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam. Such is the case for Japanese investments in coal-fired thermal power that have devastated environmental and human health in Binh Thuan province of Vietnam. Yet money and corruption have long suppressed victims’ voices, while continuing to feed coal expansion and worsen climate change effects altogether. This documentary attempts to create a public platform that broadcasts the voices of coal victims in Binh Thuan, Vietnam.'
        },
        {
          isVideo: true,
          title: 'DOCUMENTARY "HON CAU MPA UNDER THREATS FROM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/5p-Fjru1DEQ',
          content: 'The documentary “Hon Cau MPA under threats from coal power” was filmed at the communes Vinh Tan, Phuoc The, Vinh Hao, Ca Nha and the Hon Cau MPA. The clip introduces the important location of Hon Cau MPA, the native marine biodiversity with high scientific and economical values to the locals; and threats of coal power (through operation, discharge and dredging) to the MPA and to local livelihoods (fishing, salt, aquaculture etc.) This is a call to protect Hon Cau MPA from coal power impacts'
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
    filename: "./south korea.html"
  },
  {
    data: {
      path: './',
      country: 'Japan',
      center: [139.4, 38],
      scale: 1800,
      mobileScale: 740,
      plantFile: './data/Database- JP - Project JP 1.csv',
      financierFile: './data/Database- VN - Project 2.csv',
      intro: {
        coverImg: './img/vietnam_story.png',
        text: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam.'
      },
      stories: [
        {
          isVideo: true,
          title: 'WARNINGS FROM VIETNAM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/7VOi6Upnh3c',
          content: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam. Such is the case for Japanese investments in coal-fired thermal power that have devastated environmental and human health in Binh Thuan province of Vietnam. Yet money and corruption have long suppressed victims’ voices, while continuing to feed coal expansion and worsen climate change effects altogether. This documentary attempts to create a public platform that broadcasts the voices of coal victims in Binh Thuan, Vietnam.'
        },
        {
          isVideo: true,
          title: 'DOCUMENTARY "HON CAU MPA UNDER THREATS FROM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/5p-Fjru1DEQ',
          content: 'The documentary “Hon Cau MPA under threats from coal power” was filmed at the communes Vinh Tan, Phuoc The, Vinh Hao, Ca Nha and the Hon Cau MPA. The clip introduces the important location of Hon Cau MPA, the native marine biodiversity with high scientific and economical values to the locals; and threats of coal power (through operation, discharge and dredging) to the MPA and to local livelihoods (fishing, salt, aquaculture etc.) This is a call to protect Hon Cau MPA from coal power impacts'
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
    filename: "./japan.html"
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
        coverImg: './img/vietnam_story.png',
        text: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam.'
      },
      stories: [
        {
          isVideo: true,
          title: 'WARNINGS FROM VIETNAM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/7VOi6Upnh3c',
          content: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam. Such is the case for Japanese investments in coal-fired thermal power that have devastated environmental and human health in Binh Thuan province of Vietnam. Yet money and corruption have long suppressed victims’ voices, while continuing to feed coal expansion and worsen climate change effects altogether. This documentary attempts to create a public platform that broadcasts the voices of coal victims in Binh Thuan, Vietnam.'
        },
        {
          isVideo: true,
          title: 'DOCUMENTARY "HON CAU MPA UNDER THREATS FROM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/5p-Fjru1DEQ',
          content: 'The documentary “Hon Cau MPA under threats from coal power” was filmed at the communes Vinh Tan, Phuoc The, Vinh Hao, Ca Nha and the Hon Cau MPA. The clip introduces the important location of Hon Cau MPA, the native marine biodiversity with high scientific and economical values to the locals; and threats of coal power (through operation, discharge and dredging) to the MPA and to local livelihoods (fishing, salt, aquaculture etc.) This is a call to protect Hon Cau MPA from coal power impacts'
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
    filename: "./philippines.html"
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
        text: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam.'
      },
      stories: [
        {
          isVideo: true,
          title: 'WARNINGS FROM VIETNAM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/7VOi6Upnh3c',
          content: 'When a butterfly flaps its wings in Japan, it causes a hurricane in Vietnam. Such is the case for Japanese investments in coal-fired thermal power that have devastated environmental and human health in Binh Thuan province of Vietnam. Yet money and corruption have long suppressed victims’ voices, while continuing to feed coal expansion and worsen climate change effects altogether. This documentary attempts to create a public platform that broadcasts the voices of coal victims in Binh Thuan, Vietnam.'
        },
        {
          isVideo: true,
          title: 'DOCUMENTARY "HON CAU MPA UNDER THREATS FROM COAL POWER',
          mediaUrl: 'https://www.youtube.com/embed/5p-Fjru1DEQ',
          content: 'The documentary “Hon Cau MPA under threats from coal power” was filmed at the communes Vinh Tan, Phuoc The, Vinh Hao, Ca Nha and the Hon Cau MPA. The clip introduces the important location of Hon Cau MPA, the native marine biodiversity with high scientific and economical values to the locals; and threats of coal power (through operation, discharge and dredging) to the MPA and to local livelihoods (fishing, salt, aquaculture etc.) This is a call to protect Hon Cau MPA from coal power impacts'
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
    filename: "./indonesia.html"
  },
]
module.exports = route;
