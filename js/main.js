const STORAGE_KEY = 'dex'

document.getElementById('reset').addEventListener('click', () => {
  if (confirm('Reset your Pokédex?')) {
    localStorage.clear()
    location.reload()
  }
})

angular.element(document).ready(() => {
  const dex = JSON.parse(localStorage.getItem(STORAGE_KEY))
  if (dex && dex.length && dex.length > 0) {
    dex.forEach(number => {
      const checkbox = document.getElementById(number)
      if (checkbox) {
        checkbox.checked = true
        updateBackgroundColor(number)
      }
    })
  }
  document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', onCheckboxChange)
  })
})

function onCheckboxChange (event) {
  const checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked')
  const numbers = [...checkedCheckboxes].map(checkbox => checkbox.id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers))
  updateBackgroundColor(event.target.id)
}

function updateBackgroundColor (number) {
  const checkbox = document.getElementById(number)
  const container = document.getElementById('container-' + number)
  if (checkbox && container) {
    const color = checkbox.checked ? '#62D17A' : '#D3D3D3'
    container.style.backgroundColor = color
  }
}

const PokedexController = (function () {
  function PokedexController (pokedexService) {
    this.pokedexService = pokedexService
  }
  return PokedexController
}())

// https://www.dragonflycave.com/resources/pokemon-list-generator
// { id: '%[number%]', number: '%[name]%' },
const PokedexService = (function () {
  function PokedexService () {
    this.kanto = [
      { id: '001', name: 'Bulbasaur' },
      { id: '002', name: 'Ivysaur' },
      { id: '003', name: 'Venusaur' },
      { id: '003-clone', name: 'Venusaur', form: 'Venusaurtwo' },
      { id: '004', name: 'Charmander' },
      { id: '005', name: 'Charmeleon' },
      { id: '006', name: 'Charizard' },
      { id: '006-clone', name: 'Charizard', form: 'Charizardtwo' },
      { id: '007', name: 'Squirtle' },
      { id: '008', name: 'Wartortle' },
      { id: '009', name: 'Blastoise' },
      { id: '009-clone', name: 'Blastoise', form: 'Blastoisetwo' },
      { id: '010', name: 'Caterpie' },
      { id: '011', name: 'Metapod' },
      { id: '012', name: 'Butterfree' },
      { id: '013', name: 'Weedle' },
      { id: '014', name: 'Kakuna' },
      { id: '015', name: 'Beedrill' },
      { id: '016', name: 'Pidgey' },
      { id: '017', name: 'Pidgeotto' },
      { id: '018', name: 'Pidgeot' },
      { id: '019', name: 'Rattata' },
      { id: '019-a', name: 'Rattata', form: 'Alolan' },
      { id: '020', name: 'Raticate' },
      { id: '020-a', name: 'Raticate', form: 'Alolan' },
      { id: '021', name: 'Spearow' },
      { id: '022', name: 'Fearow' },
      { id: '023', name: 'Ekans' },
      { id: '024', name: 'Arbok' },
      { id: '025', name: 'Pikachu' },
      { id: '025-santa', name: 'Pikachu', form: 'Santa Hat' },
      { id: '025-ash', name: 'Pikachu', form: 'Ash Cap' },
      { id: '025-halloween', name: 'Pikachu', form: 'Witch Hat' },
      { id: '025-summer', name: 'Pikachu', form: 'Summer Style' },
      { id: '025-fragment', name: 'Pikachu', form: 'Fragment Cap' },
      { id: '025-flowers', name: 'Pikachu', form: 'Flower Crown' },
      { id: '025-detective', name: 'Pikachu', form: 'Detective' },
      { id: '025-strawhat', name: 'Pikachu', form: 'Straw Hat' },
      { id: '025-party', name: 'Pikachu', form: 'Party Hat' },
      { id: '025-halloween2019', name: 'Pikachu', form: 'Mimikyu Costume' },
      { id: '025-beanie', name: 'Pikachu', form: 'Beanie' },
      { id: '025-partyhat2020', name: 'Pikachu', form: 'Party Hat 2020' },
      { id: '025-clone', name: 'Pikachu', form: 'Pikachutwo' },
      { id: '025-libre', name: 'Pikachu', form: 'Pikachu Libre' },
      { id: '025-safari', name: 'Pikachu', form: 'Safari' },
      { id: '025-flowerhat', name: 'Pikachu', form: 'Flower Hat' },
      { id: '025-charizard', name: 'Pikachu', form: 'Charizard Hat' },
      { id: '025-umbreon', name: 'Pikachu', form: 'Umbreon Hat' },
      { id: '025-rayquaza', name: 'Pikachu', form: 'Rayquaza Hat' },
      { id: '025-lucario', name: 'Pikachu', form: 'Lucario Hat' },
      { id: '026', name: 'Raichu' },
      { id: '026-a', name: 'Raichu', form: 'Alolan' },
      { id: '027', name: 'Sandshrew' },
      { id: '027-a', name: 'Sandshrew', form: 'Alolan' },
      { id: '028', name: 'Sandslash' },
      { id: '028-a', name: 'Sandslash', form: 'Alolan' },
      { id: '029', name: 'Nidoran♀' },
      { id: '030', name: 'Nidorina' },
      { id: '031', name: 'Nidoqueen' },
      { id: '032', name: 'Nidoran♂' },
      { id: '033', name: 'Nidorino' },
      { id: '034', name: 'Nidoking' },
      { id: '035', name: 'Clefairy' },
      { id: '036', name: 'Clefable' },
      { id: '037', name: 'Vulpix' },
      { id: '037-a', name: 'Vulpix', form: 'Alolan' },
      { id: '038', name: 'Ninetales' },
      { id: '038-a', name: 'Ninetales', form: 'Alolan' },
      { id: '039', name: 'Jigglypuff' },
      { id: '040', name: 'Wigglytuff' },
      { id: '041', name: 'Zubat' },
      { id: '042', name: 'Golbat' },
      { id: '043', name: 'Oddish' },
      { id: '044', name: 'Gloom' },
      { id: '045', name: 'Vileplume' },
      { id: '046', name: 'Paras' },
      { id: '047', name: 'Parasect' },
      { id: '048', name: 'Venonat' },
      { id: '049', name: 'Venomoth' },
      { id: '050', name: 'Diglett' },
      { id: '050-a', name: 'Diglett', form: 'Alolan' },
      { id: '051', name: 'Dugtrio' },
      { id: '051-a', name: 'Dugtrio', form: 'Alolan' },
      { id: '052', name: 'Meowth' },
      { id: '052-a', name: 'Meowth', form: 'Alolan' },
      { id: '052-g', name: 'Meowth', form: 'Galarian' },
      { id: '053', name: 'Persian' },
      { id: '053-a', name: 'Persian', form: 'Alolan' },
      { id: '054', name: 'Psyduck' },
      { id: '055', name: 'Golduck' },
      { id: '056', name: 'Mankey' },
      { id: '057', name: 'Primeape' },
      { id: '058', name: 'Growlithe' },
      { id: '059', name: 'Arcanine' },
      { id: '060', name: 'Poliwag' },
      { id: '061', name: 'Poliwhirl' },
      { id: '062', name: 'Poliwrath' },
      { id: '063', name: 'Abra' },
      { id: '064', name: 'Kadabra' },
      { id: '065', name: 'Alakazam' },
      { id: '066', name: 'Machop' },
      { id: '067', name: 'Machoke' },
      { id: '068', name: 'Machamp' },
      { id: '069', name: 'Bellsprout' },
      { id: '070', name: 'Weepinbell' },
      { id: '071', name: 'Victreebel' },
      { id: '072', name: 'Tentacool' },
      { id: '073', name: 'Tentacruel' },
      { id: '074', name: 'Geodude' },
      { id: '074-a', name: 'Geodude', form: 'Alolan' },
      { id: '075', name: 'Graveler' },
      { id: '075-a', name: 'Graveler', form: 'Alolan' },
      { id: '076', name: 'Golem' },
      { id: '076-a', name: 'Golem', form: 'Alolan' },
      { id: '077', name: 'Ponyta' },
      { id: '078', name: 'Rapidash' },
      { id: '079', name: 'Slowpoke' },
      { id: '080', name: 'Slowbro' },
      { id: '081', name: 'Magnemite' },
      { id: '082', name: 'Magneton' },
      { id: '083', name: "Farfetch'd" },
      { id: '084', name: 'Doduo' },
      { id: '085', name: 'Dodrio' },
      { id: '086', name: 'Seel' },
      { id: '087', name: 'Dewgong' },
      { id: '088', name: 'Grimer' },
      { id: '088-a', name: 'Grimer', form: 'Alolan' },
      { id: '089', name: 'Muk' },
      { id: '089-a', name: 'Muk', form: 'Alolan' },
      { id: '090', name: 'Shellder' },
      { id: '091', name: 'Cloyster' },
      { id: '092', name: 'Gastly' },
      { id: '093', name: 'Haunter' },
      { id: '094', name: 'Gengar' },
      { id: '095', name: 'Onix' },
      { id: '096', name: 'Drowzee' },
      { id: '097', name: 'Hypno' },
      { id: '098', name: 'Krabby' },
      { id: '099', name: 'Kingler' },
      { id: '100', name: 'Voltorb' },
      { id: '101', name: 'Electrode' },
      { id: '102', name: 'Exeggcute' },
      { id: '103', name: 'Exeggutor' },
      { id: '103-a', name: 'Exeggutor', form: 'Alolan' },
      { id: '104', name: 'Cubone' },
      { id: '105', name: 'Marowak' },
      { id: '105-a', name: 'Marowak', form: 'Alolan' },
      { id: '106', name: 'Hitmonlee' },
      { id: '107', name: 'Hitmonchan' },
      { id: '108', name: 'Lickitung' },
      { id: '109', name: 'Koffing' },
      { id: '110', name: 'Weezing' },
      { id: '110-g', name: 'Weezing', form: 'Galarian' },
      { id: '111', name: 'Rhyhorn' },
      { id: '112', name: 'Rhydon' },
      { id: '113', name: 'Chansey' },
      { id: '114', name: 'Tangela' },
      { id: '115', name: 'Kangaskhan' },
      { id: '116', name: 'Horsea' },
      { id: '117', name: 'Seadra' },
      { id: '118', name: 'Goldeen' },
      { id: '119', name: 'Seaking' },
      { id: '120', name: 'Staryu' },
      { id: '121', name: 'Starmie' },
      { id: '122', name: 'Mr. Mime' },
      { id: '123', name: 'Scyther' },
      { id: '124', name: 'Jynx' },
      { id: '125', name: 'Electabuzz' },
      { id: '126', name: 'Magmar' },
      { id: '127', name: 'Pinsir' },
      { id: '128', name: 'Tauros' },
      { id: '129', name: 'Magikarp' },
      { id: '130', name: 'Gyarados' },
      { id: '131', name: 'Lapras' },
      { id: '132', name: 'Ditto' },
      { id: '133', name: 'Eevee' },
      { id: '134', name: 'Vaporeon' },
      { id: '135', name: 'Jolteon' },
      { id: '136', name: 'Flareon' },
      { id: '137', name: 'Porygon' },
      { id: '138', name: 'Omanyte' },
      { id: '139', name: 'Omastar' },
      { id: '140', name: 'Kabuto' },
      { id: '141', name: 'Kabutops' },
      { id: '142', name: 'Aerodactyl' },
      { id: '143', name: 'Snorlax' },
      { id: '144', name: 'Articuno' },
      { id: '145', name: 'Zapdos' },
      { id: '146', name: 'Moltres' },
      { id: '147', name: 'Dratini' },
      { id: '148', name: 'Dragonair' },
      { id: '149', name: 'Dragonite' },
      { id: '150', name: 'Mewtwo' },
      { id: '150-armored', name: 'Mewtwo', form: 'Armoured' },
      { id: '151', name: 'Mew' }
    ]
    this.johto = [
      { id: '152', name: 'Chikorita' },
      { id: '153', name: 'Bayleef' },
      { id: '154', name: 'Meganium' },
      { id: '155', name: 'Cyndaquil' },
      { id: '156', name: 'Quilava' },
      { id: '157', name: 'Typhlosion' },
      { id: '158', name: 'Totodile' },
      { id: '159', name: 'Croconaw' },
      { id: '160', name: 'Feraligatr' },
      { id: '161', name: 'Sentret' },
      { id: '162', name: 'Furret' },
      { id: '163', name: 'Hoothoot' },
      { id: '164', name: 'Noctowl' },
      { id: '165', name: 'Ledyba' },
      { id: '166', name: 'Ledian' },
      { id: '167', name: 'Spinarak' },
      { id: '168', name: 'Ariados' },
      { id: '169', name: 'Crobat' },
      { id: '170', name: 'Chinchou' },
      { id: '171', name: 'Lanturn' },
      { id: '172', name: 'Pichu' },
      { id: '173', name: 'Cleffa' },
      { id: '174', name: 'Igglybuff' },
      { id: '175', name: 'Togepi' },
      { id: '176', name: 'Togetic' },
      { id: '177', name: 'Natu' },
      { id: '178', name: 'Xatu' },
      { id: '179', name: 'Mareep' },
      { id: '180', name: 'Flaaffy' },
      { id: '181', name: 'Ampharos' },
      { id: '182', name: 'Bellossom' },
      { id: '183', name: 'Marill' },
      { id: '184', name: 'Azumarill' },
      { id: '185', name: 'Sudowoodo' },
      { id: '186', name: 'Politoed' },
      { id: '187', name: 'Hoppip' },
      { id: '188', name: 'Skiploom' },
      { id: '189', name: 'Jumpluff' },
      { id: '190', name: 'Aipom' },
      { id: '191', name: 'Sunkern' },
      { id: '192', name: 'Sunflora' },
      { id: '193', name: 'Yanma' },
      { id: '194', name: 'Wooper' },
      { id: '195', name: 'Quagsire' },
      { id: '196', name: 'Espeon' },
      { id: '197', name: 'Umbreon' },
      { id: '198', name: 'Murkrow' },
      { id: '199', name: 'Slowking' },
      { id: '200', name: 'Misdreavus' },
      { id: '201-a', name: 'Unown', form: 'A' },
      { id: '201-b', name: 'Unown', form: 'B' },
      { id: '201-c', name: 'Unown', form: 'C' },
      { id: '201-d', name: 'Unown', form: 'D' },
      { id: '201-e', name: 'Unown', form: 'E' },
      { id: '201-f', name: 'Unown', form: 'F' },
      { id: '201-g', name: 'Unown', form: 'G' },
      { id: '201-h', name: 'Unown', form: 'H' },
      { id: '201-i', name: 'Unown', form: 'I' },
      { id: '201-j', name: 'Unown', form: 'J' },
      { id: '201-k', name: 'Unown', form: 'K' },
      { id: '201-l', name: 'Unown', form: 'L' },
      { id: '201-m', name: 'Unown', form: 'M' },
      { id: '201-n', name: 'Unown', form: 'N' },
      { id: '201-o', name: 'Unown', form: 'O' },
      { id: '201-p', name: 'Unown', form: 'P' },
      { id: '201-q', name: 'Unown', form: 'Q' },
      { id: '201-r', name: 'Unown', form: 'R' },
      { id: '201-s', name: 'Unown', form: 'S' },
      { id: '201-t', name: 'Unown', form: 'T' },
      { id: '201-u', name: 'Unown', form: 'U' },
      { id: '201-v', name: 'Unown', form: 'V' },
      { id: '201-w', name: 'Unown', form: 'W' },
      { id: '201-x', name: 'Unown', form: 'X' },
      { id: '201-y', name: 'Unown', form: 'Y' },
      { id: '201-z', name: 'Unown', form: 'Z' },
      { id: '201-!', name: 'Unown', form: '!' },
      { id: '201-qm', name: 'Unown', form: '?' },
      { id: '202', name: 'Wobbuffet' },
      { id: '203', name: 'Girafarig' },
      { id: '204', name: 'Pineco' },
      { id: '205', name: 'Forretress' },
      { id: '206', name: 'Dunsparce' },
      { id: '207', name: 'Gligar' },
      { id: '208', name: 'Steelix' },
      { id: '209', name: 'Snubbull' },
      { id: '210', name: 'Granbull' },
      { id: '211', name: 'Qwilfish' },
      { id: '212', name: 'Scizor' },
      { id: '213', name: 'Shuckle' },
      { id: '214', name: 'Heracross' },
      { id: '215', name: 'Sneasel' },
      { id: '216', name: 'Teddiursa' },
      { id: '217', name: 'Ursaring' },
      { id: '218', name: 'Slugma' },
      { id: '219', name: 'Magcargo' },
      { id: '220', name: 'Swinub' },
      { id: '221', name: 'Piloswine' },
      { id: '222', name: 'Corsola' },
      { id: '223', name: 'Remoraid' },
      { id: '224', name: 'Octillery' },
      { id: '225', name: 'Delibird' },
      { id: '226', name: 'Mantine' },
      { id: '227', name: 'Skarmory' },
      { id: '228', name: 'Houndour' },
      { id: '229', name: 'Houndoom' },
      { id: '230', name: 'Kingdra' },
      { id: '231', name: 'Phanpy' },
      { id: '232', name: 'Donphan' },
      { id: '233', name: 'Porygon2' },
      { id: '234', name: 'Stantler' },
      { id: '235', name: 'Smeargle' },
      { id: '236', name: 'Tyrogue' },
      { id: '237', name: 'Hitmontop' },
      { id: '238', name: 'Smoochum' },
      { id: '239', name: 'Elekid' },
      { id: '240', name: 'Magby' },
      { id: '241', name: 'Miltank' },
      { id: '242', name: 'Blissey' },
      { id: '243', name: 'Raikou' },
      { id: '244', name: 'Entei' },
      { id: '245', name: 'Suicune' },
      { id: '246', name: 'Larvitar' },
      { id: '247', name: 'Pupitar' },
      { id: '248', name: 'Tyranitar' },
      { id: '249', name: 'Lugia' },
      { id: '250', name: 'Ho-Oh' },
      { id: '251', name: 'Celebi' }
    ]
    this.hoenn = [
      { id: '252', name: 'Treecko' },
      { id: '253', name: 'Grovyle' },
      { id: '254', name: 'Sceptile' },
      { id: '255', name: 'Torchic' },
      { id: '256', name: 'Combusken' },
      { id: '257', name: 'Blaziken' },
      { id: '258', name: 'Mudkip' },
      { id: '259', name: 'Marshtomp' },
      { id: '260', name: 'Swampert' },
      { id: '261', name: 'Poochyena' },
      { id: '262', name: 'Mightyena' },
      { id: '263', name: 'Zigzagoon' },
      { id: '263-g', name: 'Zigzagoon', form: 'Galarian' },
      { id: '264', name: 'Linoone' },
      { id: '264-g', name: 'Linoone', form: 'Galarian' },
      { id: '265', name: 'Wurmple' },
      { id: '266', name: 'Silcoon' },
      { id: '267', name: 'Beautifly' },
      { id: '268', name: 'Cascoon' },
      { id: '269', name: 'Dustox' },
      { id: '270', name: 'Lotad' },
      { id: '271', name: 'Lombre' },
      { id: '272', name: 'Ludicolo' },
      { id: '273', name: 'Seedot' },
      { id: '274', name: 'Nuzleaf' },
      { id: '275', name: 'Shiftry' },
      { id: '276', name: 'Taillow' },
      { id: '277', name: 'Swellow' },
      { id: '278', name: 'Wingull' },
      { id: '279', name: 'Pelipper' },
      { id: '280', name: 'Ralts' },
      { id: '281', name: 'Kirlia' },
      { id: '282', name: 'Gardevoir' },
      { id: '283', name: 'Surskit' },
      { id: '284', name: 'Masquerain' },
      { id: '285', name: 'Shroomish' },
      { id: '286', name: 'Breloom' },
      { id: '287', name: 'Slakoth' },
      { id: '288', name: 'Vigoroth' },
      { id: '289', name: 'Slaking' },
      { id: '290', name: 'Nincada' },
      { id: '291', name: 'Ninjask' },
      { id: '292', name: 'Shedinja' },
      { id: '293', name: 'Whismur' },
      { id: '294', name: 'Loudred' },
      { id: '295', name: 'Exploud' },
      { id: '296', name: 'Makuhita' },
      { id: '297', name: 'Hariyama' },
      { id: '298', name: 'Azurill' },
      { id: '299', name: 'Nosepass' },
      { id: '300', name: 'Skitty' },
      { id: '301', name: 'Delcatty' },
      { id: '302', name: 'Sableye' },
      { id: '303', name: 'Mawile' },
      { id: '304', name: 'Aron' },
      { id: '305', name: 'Lairon' },
      { id: '306', name: 'Aggron' },
      { id: '307', name: 'Meditite' },
      { id: '308', name: 'Medicham' },
      { id: '309', name: 'Electrike' },
      { id: '310', name: 'Manectric' },
      { id: '311', name: 'Plusle' },
      { id: '312', name: 'Minun' },
      { id: '313', name: 'Volbeat' },
      { id: '314', name: 'Illumise' },
      { id: '315', name: 'Roselia' },
      { id: '316', name: 'Gulpin' },
      { id: '317', name: 'Swalot' },
      { id: '318', name: 'Carvanha' },
      { id: '319', name: 'Sharpedo' },
      { id: '320', name: 'Wailmer' },
      { id: '321', name: 'Wailord' },
      { id: '322', name: 'Numel' },
      { id: '323', name: 'Camerupt' },
      { id: '324', name: 'Torkoal' },
      { id: '325', name: 'Spoink' },
      { id: '326', name: 'Grumpig' },
      { id: '327-7', name: 'Spinda' },
      { id: '328', name: 'Trapinch' },
      { id: '329', name: 'Vibrava' },
      { id: '330', name: 'Flygon' },
      { id: '331', name: 'Cacnea' },
      { id: '332', name: 'Cacturne' },
      { id: '333', name: 'Swablu' },
      { id: '334', name: 'Altaria' },
      { id: '335', name: 'Zangoose' },
      { id: '336', name: 'Seviper' },
      { id: '337', name: 'Lunatone' },
      { id: '338', name: 'Solrock' },
      { id: '339', name: 'Barboach' },
      { id: '340', name: 'Whiscash' },
      { id: '341', name: 'Corphish' },
      { id: '342', name: 'Crawdaunt' },
      { id: '343', name: 'Baltoy' },
      { id: '344', name: 'Claydol' },
      { id: '345', name: 'Lileep' },
      { id: '346', name: 'Cradily' },
      { id: '347', name: 'Anorith' },
      { id: '348', name: 'Armaldo' },
      { id: '349', name: 'Feebas' },
      { id: '350', name: 'Milotic' },
      { id: '351', name: 'Castform', form: 'Normal' },
      { id: '351-s', name: 'Castform', form: 'Sunny' },
      { id: '351-r', name: 'Castform', form: 'Rainy' },
      { id: '351-i', name: 'Castform', form: 'Snowy' },
      // { id: '352', name: 'Kecleon' },
      { id: '353', name: 'Shuppet' },
      { id: '354', name: 'Banette' },
      { id: '355', name: 'Duskull' },
      { id: '356', name: 'Dusclops' },
      { id: '357', name: 'Tropius' },
      { id: '358', name: 'Chimecho' },
      { id: '359', name: 'Absol' },
      { id: '360', name: 'Wynaut' },
      { id: '361', name: 'Snorunt' },
      { id: '362', name: 'Glalie' },
      { id: '363', name: 'Spheal' },
      { id: '364', name: 'Sealeo' },
      { id: '365', name: 'Walrein' },
      { id: '366', name: 'Clamperl' },
      { id: '367', name: 'Huntail' },
      { id: '368', name: 'Gorebyss' },
      { id: '369', name: 'Relicanth' },
      { id: '370', name: 'Luvdisc' },
      { id: '371', name: 'Bagon' },
      { id: '372', name: 'Shelgon' },
      { id: '373', name: 'Salamence' },
      { id: '374', name: 'Beldum' },
      { id: '375', name: 'Metang' },
      { id: '376', name: 'Metagross' },
      { id: '377', name: 'Regirock' },
      { id: '378', name: 'Regice' },
      { id: '379', name: 'Registeel' },
      { id: '380', name: 'Latias' },
      { id: '381', name: 'Latios' },
      { id: '382', name: 'Kyogre' },
      { id: '383', name: 'Groudon' },
      { id: '384', name: 'Rayquaza' },
      { id: '385', name: 'Jirachi' },
      { id: '386-d', name: 'Deoxys', form: 'Defense' },
      { id: '386', name: 'Deoxys', form: 'Normal' },
      { id: '386-a', name: 'Deoxys', form: 'Attack' },
      { id: '386-s', name: 'Deoxys', form: 'Speed' }
    ]
    this.sinnoh = [
      { id: '387', name: 'Turtwig' },
      { id: '388', name: 'Grotle' },
      { id: '389', name: 'Torterra' },
      { id: '390', name: 'Chimchar' },
      { id: '391', name: 'Monferno' },
      { id: '392', name: 'Infernape' },
      { id: '393', name: 'Piplup' },
      { id: '394', name: 'Prinplup' },
      { id: '395', name: 'Empoleon' },
      { id: '396', name: 'Starly' },
      { id: '397', name: 'Staravia' },
      { id: '398', name: 'Staraptor' },
      { id: '399', name: 'Bidoof' },
      { id: '400', name: 'Bibarel' },
      { id: '401', name: 'Kricketot' },
      { id: '402', name: 'Kricketune' },
      { id: '403', name: 'Shinx' },
      { id: '404', name: 'Luxio' },
      { id: '405', name: 'Luxray' },
      { id: '406', name: 'Budew' },
      { id: '407', name: 'Roserade' },
      { id: '408', name: 'Cranidos' },
      { id: '409', name: 'Rampardos' },
      { id: '410', name: 'Shieldon' },
      { id: '411', name: 'Bastiodon' },
      { id: '412', name: 'Burmy', form: 'Plant' },
      { id: '412-c', name: 'Burmy', form: 'Sandy' },
      { id: '412-s', name: 'Burmy', form: 'Trash' },
      { id: '413', name: 'Wormadam', form: 'Plant' },
      { id: '413-c', name: 'Wormadam', form: 'Sandy' },
      { id: '413-s', name: 'Wormadam', form: 'Trash' },
      { id: '414', name: 'Mothim' },
      { id: '415', name: 'Combee' },
      { id: '416', name: 'Vespiquen' },
      { id: '417', name: 'Pachirisu' },
      { id: '418', name: 'Buizel' },
      { id: '419', name: 'Floatzel' },
      { id: '420', name: 'Cherubi' },
      { id: '421', name: 'Cherrim', form: 'Overcast' },
      { id: '421-s', name: 'Cherrim', form: 'Sunny' },
      { id: '422', name: 'Shellos', form: 'West Sea' },
      { id: '422-e', name: 'Shellos', form: 'East Sea' },
      { id: '423', name: 'Gastrodon', form: 'West Sea' },
      { id: '423-e', name: 'Gastrodon', form: 'East Sea' },
      { id: '424', name: 'Ambipom' },
      { id: '425', name: 'Drifloon' },
      { id: '426', name: 'Drifblim' },
      { id: '427', name: 'Buneary' },
      { id: '428', name: 'Lopunny' },
      { id: '429', name: 'Mismagius' },
      { id: '430', name: 'Honchkrow' },
      { id: '431', name: 'Glameow' },
      { id: '432', name: 'Purugly' },
      { id: '433', name: 'Chingling' },
      { id: '434', name: 'Stunky' },
      { id: '435', name: 'Skuntank' },
      { id: '436', name: 'Bronzor' },
      { id: '437', name: 'Bronzong' },
      { id: '438', name: 'Bonsly' },
      { id: '439', name: 'Mime Jr.' },
      { id: '440', name: 'Happiny' },
      { id: '441', name: 'Chatot' },
      { id: '442', name: 'Spiritomb' },
      { id: '443', name: 'Gible' },
      { id: '444', name: 'Gabite' },
      { id: '445', name: 'Garchomp' },
      { id: '446', name: 'Munchlax' },
      { id: '447', name: 'Riolu' },
      { id: '448', name: 'Lucario' },
      { id: '449', name: 'Hippopotas' },
      { id: '450', name: 'Hippowdon' },
      { id: '451', name: 'Skorupi' },
      { id: '452', name: 'Drapion' },
      { id: '453', name: 'Croagunk' },
      { id: '454', name: 'Toxicroak' },
      { id: '455', name: 'Carnivine' },
      { id: '456', name: 'Finneon' },
      { id: '457', name: 'Lumineon' },
      { id: '458', name: 'Mantyke' },
      { id: '459', name: 'Snover' },
      { id: '460', name: 'Abomasnow' },
      { id: '461', name: 'Weavile' },
      { id: '462', name: 'Magnezone' },
      { id: '463', name: 'Lickilicky' },
      { id: '464', name: 'Rhyperior' },
      { id: '465', name: 'Tangrowth' },
      { id: '466', name: 'Electivire' },
      { id: '467', name: 'Magmortar' },
      { id: '468', name: 'Togekiss' },
      { id: '469', name: 'Yanmega' },
      { id: '470', name: 'Leafeon' },
      { id: '471', name: 'Glaceon' },
      { id: '472', name: 'Gliscor' },
      { id: '473', name: 'Mamoswine' },
      { id: '474', name: 'Porygon-Z' },
      { id: '475', name: 'Gallade' },
      { id: '476', name: 'Probopass' },
      { id: '477', name: 'Dusknoir' },
      { id: '478', name: 'Froslass' },
      // { id: '479', name: 'Rotom' },
      // { id: '479-s', name: 'Rotom', form: 'Fan' },
      // { id: '479-f', name: 'Rotom', form: 'Frost' },
      // { id: '479-h', name: 'Rotom', form: 'Heat' },
      // { id: '479-m', name: 'Rotom', form: 'Mow' },
      // { id: '479-w', name: 'Rotom', form: 'Wash' },
      { id: '480', name: 'Uxie' },
      { id: '481', name: 'Mesprit' },
      { id: '482', name: 'Azelf' },
      { id: '483', name: 'Dialga' },
      { id: '484', name: 'Palkia' },
      { id: '485', name: 'Heatran' },
      { id: '486', name: 'Regigigas' },
      { id: '487', name: 'Giratina', form: 'Altered' },
      { id: '487-o', name: 'Giratina', form: 'Origin' },
      { id: '488', name: 'Cresselia' },
      // { id: '489', name: 'Phione' },
      // { id: '490', name: 'Manaphy' },
      { id: '491', name: 'Darkrai' },
      // { id: '492', name: 'Shaymin', form: 'Land' },
      // { id: '492-s', name: 'Shaymin', form: 'Sky' },
      // { id: '493', name: 'Arceus', form: 'Normal' },
      // { id: '493-bug', name: 'Arceus', form: 'Bug' },
      // { id: '493-dark', name: 'Arceus', form: 'Dark' },
      // { id: '493-dragon', name: 'Arceus', form: 'Dragon' },
      // { id: '493-electric', name: 'Arceus', form: 'Electric' },
      // { id: '493-fairy', name: 'Arceus', form: 'Fairy' },
      // { id: '493-fighting', name: 'Arceus', form: 'Fighting' },
      // { id: '493-fire', name: 'Arceus', form: 'Fire' },
      // { id: '493-flying', name: 'Arceus', form: 'Flying' },
      // { id: '493-ghost', name: 'Arceus', form: 'Ghost' },
      // { id: '493-grass', name: 'Arceus', form: 'Grass' },
      // { id: '493-ground', name: 'Arceus', form: 'Ground' },
      // { id: '493-ice', name: 'Arceus', form: 'Ice' },
      // { id: '493-poison', name: 'Arceus', form: 'Poison' },
      // { id: '493-psychic', name: 'Arceus', form: 'Psychic' },
      // { id: '493-rock', name: 'Arceus', form: 'Rock' },
      // { id: '493-steel', name: 'Arceus', form: 'Steel' },
      // { id: '493-water', name: 'Arceus', form: 'Water' }
    ]
    this.unova = [
      // { id: '494', name: 'Victini' },
      { id: '495', name: 'Snivy' },
      { id: '496', name: 'Servine' },
      { id: '497', name: 'Serperior' },
      { id: '498', name: 'Tepig' },
      { id: '499', name: 'Pignite' },
      { id: '500', name: 'Emboar' },
      { id: '501', name: 'Oshawott' },
      { id: '502', name: 'Dewott' },
      { id: '503', name: 'Samurott' },
      { id: '504', name: 'Patrat' },
      { id: '505', name: 'Watchog' },
      { id: '506', name: 'Lillipup' },
      { id: '507', name: 'Herdier' },
      { id: '508', name: 'Stoutland' },
      { id: '509', name: 'Purrloin' },
      { id: '510', name: 'Liepard' },
      { id: '511', name: 'Pansage' },
      { id: '512', name: 'Simisage' },
      { id: '513', name: 'Pansear' },
      { id: '514', name: 'Simisear' },
      { id: '515', name: 'Panpour' },
      { id: '516', name: 'Simipour' },
      // { id: '517', name: 'Munna' },
      // { id: '518', name: 'Musharna' },
      { id: '519', name: 'Pidove' },
      { id: '520', name: 'Tranquill' },
      { id: '521', name: 'Unfezant' },
      { id: '522', name: 'Blitzle' },
      { id: '523', name: 'Zebstrika' },
      { id: '524', name: 'Roggenrola' },
      { id: '525', name: 'Boldore' },
      { id: '526', name: 'Gigalith' },
      { id: '527', name: 'Woobat' },
      { id: '528', name: 'Swoobat' },
      { id: '529', name: 'Drilbur' },
      { id: '530', name: 'Excadrill' },
      { id: '531', name: 'Audino' },
      { id: '532', name: 'Timburr' },
      { id: '533', name: 'Gurdurr' },
      { id: '534', name: 'Conkeldurr' },
      { id: '535', name: 'Tympole' },
      { id: '536', name: 'Palpitoad' },
      { id: '537', name: 'Seismitoad' },
      { id: '538', name: 'Throh' },
      { id: '539', name: 'Sawk' },
      // { id: '540', name: 'Sewaddle' },
      // { id: '541', name: 'Swadloon' },
      // { id: '542', name: 'Leavanny' },
      { id: '543', name: 'Venipede' },
      { id: '544', name: 'Whirlipede' },
      { id: '545', name: 'Scolipede' },
      // { id: '546', name: 'Cottonee' },
      // { id: '547', name: 'Whimsicott' },
      // { id: '548', name: 'Petilil' },
      // { id: '549', name: 'Lilligant' },
      { id: '550', name: 'Basculin', form: 'Red-Striped' },
      { id: '550-b', name: 'Basculin', form: 'Blue-Striped' },
      // { id: '551', name: 'Sandile' },
      // { id: '552', name: 'Krokorok' },
      // { id: '553', name: 'Krookodile' },
      { id: '554', name: 'Darumaka' },
      { id: '554-g', name: 'Darumaka', form: 'Galarian' },
      { id: '555', name: 'Darmanitan' },
      { id: '555-g', name: 'Darmanitan', form: 'Galarian' },
      { id: '556', name: 'Maractus' },
      { id: '557', name: 'Dwebble' },
      { id: '558', name: 'Crustle' },
      { id: '559', name: 'Scraggy' },
      { id: '560', name: 'Scrafty' },
      { id: '561', name: 'Sigilyph' },
      { id: '562', name: 'Yamask' },
      { id: '563', name: 'Cofagrigus' },
      { id: '564', name: 'Tirtouga' },
      { id: '565', name: 'Carracosta' },
      { id: '566', name: 'Archen' },
      { id: '567', name: 'Archeops' },
      { id: '568', name: 'Trubbish' },
      { id: '569', name: 'Garbodor' },
      // { id: '570', name: 'Zorua' },
      // { id: '571', name: 'Zoroark' },
      { id: '572', name: 'Minccino' },
      { id: '573', name: 'Cinccino' },
      { id: '574', name: 'Gothita' },
      { id: '575', name: 'Gothorita' },
      { id: '576', name: 'Gothitelle' },
      { id: '577', name: 'Solosis' },
      { id: '578', name: 'Duosion' },
      { id: '579', name: 'Reuniclus' },
      // { id: '580', name: 'Ducklett' },
      // { id: '581', name: 'Swanna' },
      // { id: '582', name: 'Vanillite' },
      // { id: '583', name: 'Vanillish' },
      // { id: '584', name: 'Vanilluxe' },
      // { id: '585', name: 'Deerling' },
      // { id: '586', name: 'Sawsbuck' },
      // { id: '587', name: 'Emolga' },
      { id: '588', name: 'Karrablast' },
      { id: '589', name: 'Escavalier' },
      { id: '590', name: 'Foongus' },
      { id: '591', name: 'Amoonguss' },
      // { id: '592', name: 'Frillish' },
      // { id: '593', name: 'Jellicent' },
      { id: '594', name: 'Alomomola' },
      { id: '595', name: 'Joltik' },
      { id: '596', name: 'Galvantula' },
      { id: '597', name: 'Ferroseed' },
      { id: '598', name: 'Ferrothorn' },
      { id: '599', name: 'Klink' },
      { id: '600', name: 'Klang' },
      { id: '601', name: 'Klinklang' },
      // { id: '602', name: 'Tynamo' },
      // { id: '603', name: 'Eelektrik' },
      // { id: '604', name: 'Eelektross' },
      // { id: '605', name: 'Elgyem' },
      // { id: '606', name: 'Beheeyem' },
      { id: '607', name: 'Litwick' },
      { id: '608', name: 'Lampent' },
      { id: '609', name: 'Chandelure' },
      { id: '610', name: 'Axew' },
      { id: '611', name: 'Fraxure' },
      { id: '612', name: 'Haxorus' },
      { id: '613', name: 'Cubchoo' },
      { id: '614', name: 'Beartic' },
      { id: '615', name: 'Cryogonal' },
      { id: '616', name: 'Shelmet' },
      { id: '617', name: 'Accelgor' },
      { id: '618', name: 'Stunfisk' },
      { id: '618-g', name: 'Stunfisk', form: 'Galarian' },
      // { id: '619', name: 'Mienfoo' },
      // { id: '620', name: 'Mienshao' },
      // { id: '621', name: 'Druddigon' },
      { id: '622', name: 'Golett' },
      { id: '623', name: 'Golurk' },
      // { id: '624', name: 'Pawniard' },
      // { id: '625', name: 'Bisharp' },
      // { id: '626', name: 'Bouffalant' },
      { id: '627', name: 'Rufflet' },
      { id: '628', name: 'Braviary' },
      // { id: '629', name: 'Vullaby' },
      // { id: '630', name: 'Mandibuzz' },
      { id: '631', name: 'Heatmor' },
      { id: '632', name: 'Durant' },
      { id: '633', name: 'Deino' },
      { id: '634', name: 'Zweilous' },
      { id: '635', name: 'Hydreigon' },
      // { id: '636', name: 'Larvesta' },
      // { id: '637', name: 'Volcarona' },
      { id: '638', name: 'Cobalion' },
      { id: '639', name: 'Terrakion' },
      { id: '640', name: 'Virizion' },
      { id: '641', name: 'Tornadus' },
      { id: '642', name: 'Thundurus' },
      { id: '643', name: 'Reshiram' },
      // { id: '644', name: 'Zekrom' },
      { id: '645', name: 'Landorus' },
      // { id: '646', name: 'Kyurem' },
      // { id: '647', name: 'Keldeo' },
      // { id: '648', name: 'Meloetta' },
      { id: '649', name: 'Genesect' }
    ]
    this.unknown = [
      { id: '808', name: 'Meltan' },
      { id: '809', name: 'Melmetal' }
    ]
    this.galar = [
      { id: '862', name: 'Obstagoon' },
      { id: '863', name: 'Perrserker' }
    ]
  }
  return PokedexService
}())

angular.module('app', ['angular.filter'])
  .controller('PokedexController', PokedexController)
  .service('pokedexService', PokedexService)
