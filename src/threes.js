const trees =[    ["MURATURE 459", 10, "PUNTA ALTA", "SURFSHOP BAMBACI", 421754, 2932, "INDUMENTARIA", -38.88022604, -62.07417782, "Buenos Aires"],
    ["PELLEGRINI 68", 15, "PUNTA ALTA", "TERRITORIO EXTREMO", null, null, "INDUMENTARIA", -38.87739259, -62.08361239, "Buenos Aires"],
    ["AV. ROCA 301", 15, "ALLEN", "LOREDANA", 4451827, 298, "INDUMENTARIA", -38.9798486, -67.830361, "Río Negro"],
    ["TOMÁS ORELL 279", 15, "ALLEN", "LUZ SPORT", 4453027, 298, "INDUMENTARIA", -38.97816846, -67.82579761, "Río Negro"],
    ["SAN MARTÍN 590", 15, "AZUL", "CHE BERLÍN", 633996, 2281, "INDUMENTARIA", -36.77978393, -59.86112476, "Buenos Aires"],
    ["AV. LIBERTAD 137", 10, "BENITO JUÁREZ", "CALZADOS CARIOCA", 454502, 2292, "ZAPATERÍA", -37.6716756, -59.80693688, "Buenos Aires"],
    ["AV. SAN MARTÍN 295", 15, "BOLÍVAR", "SIN LÍMITE", 411974, 2314, "DEPORTE", -36.23368863, -61.10987598, "Buenos Aires"],
    ["GÜEMES 32", 15, "BOLÍVAR", "CAPRICHOSAS", 576397, 2314, "INDUMENTARIA", -36.23184548, -61.11172439, "Buenos Aires"],
    ["25 DE MAYO 201", 15, "CHOELE CHOEL", "LA ECONÓMICA-CHOELE CHOEL", 442446, 2946, "INDUMENTARIA", -39.295631, -65.6547953, "Río Negro"],
    ["COLÓN 1177", 15, "CARHUÉ", "YG INDUMENTARIA", 696546, 2923, "INDUMENTARIA", -37.1767902, -62.7600089, "Buenos Aires"],
    ["STEGMANN 763", 10, "CORONEL PRINGLES", "MAURO CALZADOS", 466077, 2922, "ZAPATERÍA", -37.98512647, -61.35547412, "Buenos Aires"],
    ["AV. ZEBALLOS 290", 15, "GUATRACHÉ", "STYLO MODAS", 492675, 2924, "INDUMENTARIA", -37.6668835, -63.5378684, "La Pampa"],
    ["AV. CAMPOS 148", 15, "LOBERÍA", "LOS GALLEGUITOS", 440167, 2261, "INDUMENTARIA", -38.16214976, -58.78152804, "Buenos Aires"],
    ["AV. ALEM 150", 15, "BAHIA BLANCA", "MULATO Café & Pastelería", 440167, 2261, "INDUMENTARIA", -38.7092228, -62.2631479, "Buenos Aires"],
    ["AV. COLON 580", 10, "BAHIA BLANCA", "El Mundo de la Comida", 440167, 2261, "INDUMENTARIA", -38.7226051, -62.2726677, "Buenos Aires"]
]

const formatted = trees.map(([direccion, descuento, localidad, nombreComercio, telefono,prefijo, rubro, lat, lng,]) => ({
    direccion, descuento, localidad, nombreComercio, telefono,prefijo, rubro, lat, lng,
    key: JSON.stringify({ direccion, descuento, localidad, nombreComercio, telefono,prefijo, rubro, lat, lng, })
  }))
  
  export default formatted