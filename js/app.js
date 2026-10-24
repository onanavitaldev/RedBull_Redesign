const { createApp, ref, onMounted, onUnmounted, nextTick } = Vue;

createApp({
  setup() {
    const isScrolled = ref(false);
    const currentSlide = ref(0);
    let slideInterval = null;

    const slides = ref([
      {
        id: 1,
        type: 'video',
        mediaUrl: 'assets/img/asset (1).mp4',
        title: 'Max Verstappen passes 100 karts in just 35 minutes in Max vs 100',
        description: 'Max Verstappen started from the back of a 101-kart grid at Silverstone. What happened over the next 14 laps was something else.',
        tags: [{ text: 'Max Verstappen', icon: true }, { text: 'Karting', icon: false }, { text: '4 Min', icon: false }]
      },
      {
        id: 2,
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1920&auto=format&fit=crop',
        title: 'Red Bull Racing: Pushing limits across the globe',
        description: 'Experience high-speed adrenaline and unrivaled performance on world-class racing circuits.',
        tags: [{ text: 'Formula 1', icon: true }, { text: 'Racing', icon: false }, { text: '6 Min', icon: false }]
      },
      {
        id: 3,
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop',
        title: 'Extreme Sports: Beyond the edge of possible',
        description: 'From downhill mountain biking to aerobatic flight, see how Red Bull athletes defy gravity.',
        tags: [{ text: 'Extreme', icon: true }, { text: 'Action', icon: false }, { text: '5 Min', icon: false }]
      }
    ]);

    const drinks = ref([
      {
        id: 'original',
        name: 'Original',
        watermark: 'ORIGINAL',
        subtitle: 'Red Bull Energy Drink',
        volume: '8.4 FL OZ (250 ml)',
        calories: '110 kcal',
        bgGradient: 'radial-gradient(circle at center, #0F2042 0%, #050B18 100%)',
        textColor: '#FFFFFF',
        accentColor: '#DB0A40',
        btnBg: '#DB0A40',
        btnText: '#FFFFFF',
        description: 'Red Bull Energy Drink is appreciated worldwide by top athletes, busy professionals, university students, and travelers on long journeys. Specially formulated with high-quality ingredients like caffeine, taurine, and B-group vitamins, it vitalizes both body and mind whenever you need a boost. Each can delivers a signature refreshing taste that powers you through intense physical efforts and demanding mental challenges.',
        image: 'assets/img/asset (3).avif'
      },
      {
        id: 'coconut',
        name: 'Coconut Edition',
        watermark: 'COCONUT',
        subtitle: 'The Coconut Edition',
        volume: '8.4 FL OZ (250 ml)',
        calories: '110 kcal',
        bgGradient: 'radial-gradient(circle at center, #EAEFF5 0%, #B0C4DE 100%)',
        textColor: '#0A192F',
        accentColor: '#0077B6',
        btnBg: '#0A192F',
        btnText: '#FFFFFF',
        description: 'Experience an exotic twist on classic energy with the refreshing taste of tropical coconut fused with sweet berry notes. This special edition combines the functional benefits of Red Bull with an uplifting flavor profile perfect for warm summer days. It delivers the same vitalizing energy boost while transporting your senses to an island paradise with every single sip.',
        image: 'assets/img/asset (2).avif'
      },
      {
        id: 'apple',
        name: 'Apple Edition',
        watermark: 'APPLE',
        subtitle: 'The Apple Edition',
        volume: '8.4 FL OZ (250 ml)',
        calories: '110 kcal',
        bgGradient: 'radial-gradient(circle at center, #80131D 0%, #3B030A 100%)',
        textColor: '#FFFFFF',
        accentColor: '#EAA320',
        btnBg: '#EAA320',
        btnText: '#000000',
        description: 'A bold fusion of crisp Fuji apple notes balanced with a warm, fiery hint of ginger creates an uncommonly bold flavor. Crafted for those seeking an exciting taste adventure, it offers a vibrant kick that immediately awakens your palate. Fuel your focus and power through your busy schedule with this uniquely spiced energy blend.',
        image: 'assets/img/asset (1).avif'
      }
    ]);

    const stories = ref([
      {
        id: 1,
        title: 'Behind the Scenes: Max Verstappen’s Legendary Silverstone Run',
        category: 'Formula 1',
        readTime: '5 min read',
        date: 'Oct 2026',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 2,
        title: 'Conquering Utah: The World’s Most Dangerous MTB Rampage',
        category: 'Extreme MTB',
        readTime: '7 min read',
        date: 'Sep 2026',
        image: 'https://images.pexels.com/photos/33626705/pexels-photo-33626705.jpeg'
      },
      {
        id: 3,
        title: 'Red Bull BC One: How Street Dance Took Over Paris',
        category: 'Breakdance',
        readTime: '4 min read',
        date: 'Aug 2026',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 4,
        title: 'High Altitude Aerobatics: Pushing Wingsuits to the Limit',
        category: 'Skydiving',
        readTime: '6 min read',
        date: 'Jul 2026',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop'
      }
    ]);

    const events = ref([
      {
        id: 1,
        title: 'Osirus Jack Live in Concert',
        category: 'Concert',
        date: '18 NOV 2026',
        location: 'Yaoundé, Cameroon',
        description: 'The trap pioneer Osirus Jack takes over Yaoundé for an exclusive live performance featuring heavy basslines and dark underground energy.',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 2,
        title: 'Dakar Esports Championship',
        category: 'Esports',
        date: '04 DEC 2026',
        location: 'Dakar, Senegal',
        description: 'West Africa premier gaming showdown arrives in Dakar with top-tier players battling on stage in high-stakes competitive tournaments.',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 3,
        title: 'Red Bull Dance Your Style',
        category: 'Culture',
        date: '22 JAN 2027',
        location: 'Dakar, Senegal',
        description: 'The ultimate street dance battle where performers face off to mainstream tracks voted on by the crowd with no pre-choreographed routines.',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 4,
        title: 'Cliff Diving World Series',
        category: 'Extreme',
        date: '14 FEB 2027',
        location: 'Azores, Portugal',
        description: 'Elite athletes execute breathtaking acrobatic dives from staggering heights directly into the open ocean against natural backdrops.',
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 5,
        title: 'Red Bull Rampage',
        category: 'Freeride',
        date: '05 MAR 2027',
        location: 'Utah, United States',
        description: 'The most demanding mountain bike freeride event on earth pushes riders down vertical sandstone ridges with massive drops.',
        image: 'https://images.pexels.com/photos/33626705/pexels-photo-33626705.jpeg'
      },
      {
        id: 6,
        title: 'Formula 1 Grand Prix Party',
        category: 'Motorsport',
        date: '19 APR 2027',
        location: 'Monaco',
        description: 'An exclusive waterfront showcase celebrating high-speed engineering with legendary racing drivers and immersive simulator zones.',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 7,
        title: 'Red Bull BC One World Final',
        category: 'Breaking',
        date: '12 MAY 2027',
        location: 'Rio de Janeiro, Brazil',
        description: 'The biggest one-on-one breaking competition globally gathers the finest international b-boys and b-girls to crown the undisputed champion.',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 8,
        title: 'Red Bull Flugtag',
        category: 'Innovation',
        date: '30 JUN 2027',
        location: 'Cape Town, South Africa',
        description: 'Creative teams build homemade human-powered flying machines and attempt to launch them off a high deck into the water.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop'
      }
    ]);

    const currentAthlete = ref(0);
    const athletes = ref([
      {
        id: 1,
        name: 'Neymar Jr',
        sport: 'Football',
        country: 'Brazil',
        bio: 'One of the most talented players Brazil has ever produced, Neymar Jr is now back where it all started and playing at his home club Santos.',
        image: 'https://images.afootballreport.com/afr/blog/neymar-jr-psg.jpg'
      },
      {
        id: 2,
        name: 'Memphis Depay',
        sport: 'Football',
        country: 'Netherlands',
        bio: 'Versatile forward known for his explosive skill, creative flair, and unstoppable drive both on and off the pitch.',
        image: 'https://images.nu.nl/m/6hcxktpaeyn2_wd854/0/83/3071/1728/herstel-memphis-duurt-langer-door-foute-oefening-corinthians-staflid.jpg'
      },
      {
        id: 3,
        name: 'Liam Lawson',
        sport: 'F1',
        country: 'New Zealand',
        bio: 'Liam Lawson, New Zealand rising F1 star, is making his mark on the grid as he chases success with Visa Cash App Racing Bulls.',
        image: 'https://www.f1-fansite.com/wp-content/uploads/2025/10/SI202508030484-Groot-1536x1024.jpg'
      }
    ]);

    const shows = ref([
      {
        id: 1,
        title: 'The Art of Flight: Uncut',
        genre: 'Documentary',
        duration: '1h 20m',
        description: 'Follow Travis Rice and the world’s top snowboarders as they redefine what is possible on remote mountain peaks across Alaska and South America.',
        image: 'https://images.pexels.com/photos/11183395/pexels-photo-11183395.jpeg'
      },
      {
        id: 2,
        title: 'Formula 1: Drive to Victory',
        genre: 'Motorsport',
        duration: '45m',
        description: 'An exclusive behind-the-scenes look into the Oracle Red Bull Racing pit garage during high-stakes championship rounds.',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 3,
        title: 'Ways of the Wild: Surfing Chope',
        genre: 'Extreme Sports',
        duration: '52m',
        description: 'Experience the terrifying beauty of Tahiti’s heaviest wave as big wave surfers risk everything in monstrous barrels.',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 4,
        title: 'Dance Around the Globe',
        genre: 'Culture',
        duration: '38m',
        description: 'Discover the world’s most talented street dancers fighting for ultimate glory in the BC One global qualification tournaments.',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 5,
        title: 'Gamer’s Edge: Dakar Final',
        genre: 'Esports',
        duration: '1h 10m',
        description: 'Dive deep into the high-octane atmosphere of West Africa’s biggest esports showdown streamed live from Dakar.',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
      }
    ]);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 30;
    };

    const startAutoplay = () => {
      slideInterval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.value.length;
      }, 9000);
    };

    const playCanSound = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < buffer.length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        noise.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } catch (e) { }
    };

    // PINNED SECTION GSAP ANIMATION LOGIC
    const initGsapPinnedDrinks = () => {
      gsap.registerPlugin(ScrollTrigger);

      const cans = gsap.utils.toArray('.drink-can-item');
      const leftInfos = gsap.utils.toArray('.drink-info-left-item');
      const rightInfos = gsap.utils.toArray('.drink-info-right-item');
      const bgLayers = gsap.utils.toArray('.drink-bg-layer');

      cans.forEach((can, i) => {
        if (i !== 0) {
          gsap.set(can, { opacity: 0, scale: 0.7, y: 120, rotation: -15 });
        } else {
          gsap.set(can, { opacity: 1, scale: 1, y: 0, rotation: 0 });
        }
      });

      leftInfos.forEach((el, i) => {
        if (i !== 0) gsap.set(el, { opacity: 0, x: -50 });
        else gsap.set(el, { opacity: 1, x: 0 });
      });

      rightInfos.forEach((el, i) => {
        if (i !== 0) gsap.set(el, { opacity: 0, x: 50 });
        else gsap.set(el, { opacity: 1, x: 0 });
      });

      bgLayers.forEach((bg, i) => {
        if (i !== 0) gsap.set(bg, { opacity: 0 });
        else gsap.set(bg, { opacity: 1 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#energy-drinks-section',
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      for (let i = 0; i < cans.length - 1; i++) {
        tl.to(cans[i], { opacity: 0, scale: 0.7, y: -120, rotation: 15, duration: 1 })
          .to(leftInfos[i], { opacity: 0, x: -50, duration: 1 }, '<')
          .to(rightInfos[i], { opacity: 0, x: 50, duration: 1 }, '<')
          .to(bgLayers[i], { opacity: 0, duration: 1 }, '<')

          .to(bgLayers[i + 1], { opacity: 1, duration: 1 }, '<')
          .to(cans[i + 1], { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1 }, '<')
          .to(leftInfos[i + 1], { opacity: 1, x: 0, duration: 1 }, '<')
          .to(rightInfos[i + 1], { opacity: 1, x: 0, duration: 1 }, '<');
      }
    };

    const initStoriesAnimation = () => {
      gsap.from('.story-card', {
        scrollTrigger: {
          trigger: '#stories',
          start: 'bottom 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      startAutoplay();

      nextTick(() => {
        initGsapPinnedDrinks();
        initStoriesAnimation();
        ScrollTrigger.refresh();
      });
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      if (slideInterval) clearInterval(slideInterval);
    });

    return {
      isScrolled,
      currentSlide,
      slides,
      drinks,
      stories,
      events,
      currentAthlete,
      athletes,
      shows,
      playCanSound
    };
  }
}).mount('#app');