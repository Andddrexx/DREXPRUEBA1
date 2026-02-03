/*
  # Catálogo completo de productos CBDrex

  1. Descripción
    - Migración para agregar el catálogo completo de productos
    - Incluye 11 vapers Rollz con 97% 10-OH-HHC
    - Incluye 10 mecheros variados
    - Incluye 5 accesorios (estuches y complementos)

  2. Productos Vapers (11 unidades)
    - Todos son Vape Pen Desechable Rollz
    - 97% de 10-OH-HHC
    - 1ml de destilado (970 mg)
    - THC <0,2%
    - Hasta 600 caladas
    - Recargable por micro-USB
    - Sabores: Lemon Sherbet, Triple Berry, Tropicool, Grape Soda, Amnesia Haze, Sour Diesel, OG Kush, Raspberry Cream, MAC, Runtz, Mango Kush

  3. Productos Mecheros (10 unidades)
    - Mecheros con diversos diseños y colores
    - Encendido electrónico confiable

  4. Productos Accesorios (5 unidades)
    - 2 estuches para vapers
    - 3 accesorios complementarios

  5. Notas importantes
    - Todos los precios son orientativos
    - Stock disponible para todos los productos
    - Categorías: 'vaper', 'mechero', 'accesorio'
*/

-- Vapers Rollz 97% 10-OH-HHC (11 productos)
INSERT INTO products (name, description, price, image_url, category, flavor, format, stock, featured) VALUES
('Vape Peeeeeeeeeeeeen Desechable 97% 10-OH-HHC Lemon Sherbet 1ml – Rollz', 
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape Lemon Sherbet tiene un sabor fresco y cítrico con matices dulces.',
 28.00,
 '/assets/lemon.jpeg',
 'vaper',
 'Lemon Sherbet - Sabor fresco y cítrico con matices dulces',
 '1ml - 970mg 10-OH-HHC',
 50,
 true),

('Vape Pen Desechable 97% 10-OH-HHC Triple Berry 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape Triple Berry tiene un delicioso sabor a frutos rojos.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'Triple Berry - Delicioso sabor a frutos rojos',
 '1ml - 970mg 10-OH-HHC',
 50,
 true),

('Vape Pen Desechable 97% 10-OH-HHC Tropicool 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape Tropicool tiene un delicioso sabor a frutos tropicales.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'Tropicool - Delicioso sabor a frutos tropicales',
 '1ml - 970mg 10-OH-HHC',
 50,
 true),

('Vape Pen Desechable 97% 10-OH-HHC Grape Soda 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape Grape Soda tiene un sabor a jugo de uva fresco.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'Grape Soda - Sabor a jugo de uva fresco',
 '1ml - 970mg 10-OH-HHC',
 50,
 false),

('Vape Pen Desechable 97% 10-OH-HHC Amnesia Haze 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape está creado con los terpenos de la genética Amnesia Haze.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'Amnesia Haze - Terpenos de la genética Amnesia Haze',
 '1ml - 970mg 10-OH-HHC',
 50,
 false),

('Vape Pen Desechable 97% 10-OH-HHC Sour Diesel 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape está creado con los terpenos de la genética Sour Diesel.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'Sour Diesel - Terpenos de la genética Sour Diesel',
 '1ml - 970mg 10-OH-HHC',
 50,
 false),

('Vape Pen Desechable 97% 10-OH-HHC OG Kush 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape está creado con los terpenos de la genética OG Kush.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'OG Kush - Terpenos de la genética OG Kush',
 '1ml - 970mg 10-OH-HHC',
 50,
 false),

('Vape Pen Desechable 97% 10-OH-HHC Raspberry Cream 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape Raspberry Cream tiene un delicioso sabor a crema de frambuesa.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'Raspberry Cream - Delicioso sabor a crema de frambuesa',
 '1ml - 970mg 10-OH-HHC',
 50,
 false),

('Vape Pen Desechable 97% 10-OH-HHC MAC 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape MAC (Miracle Aliens Cookies) tiene un sabor a galleta de mantequilla con un toque de limón y notas terrosas.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'MAC - Sabor a galleta de mantequilla con limón y notas terrosas',
 '1ml - 970mg 10-OH-HHC',
 50,
 false),

('Vape Pen Desechable 97% 10-OH-HHC Runtz 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Este vape Runtz tiene un sabor a bayas y frutas tropicales.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'Runtz - Sabor a bayas y frutas tropicales',
 '1ml - 970mg 10-OH-HHC',
 50,
 false),

('Vape Pen Desechable 97% 10-OH-HHC Mango Kush 1ml – Rollz',
 'Vaporizador desechable de la marca Rollz con 97% de 10-OH-HHC. Contiene 1 ml de destilado (970 mg) con THC <0,2%. Su formato compacto y discreto lo hace fácil de usar y transportar. Listo para usar, sin botones ni configuraciones. Vaporización automática por inhalación. Recargable por micro-USB hasta agotar el contenido, con autonomía aproximada de hasta 600 caladas. Esta variedad está creada con los terpenos de la genética Mango Kush.',
 25.00,
 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
 'vaper',
 'Mango Kush - Terpenos de la genética Mango Kush',
 '1ml - 970mg 10-OH-HHC',
 50,
 false);

-- Mecheros (10 productos)
INSERT INTO products (name, description, price, image_url, category, flavor, format, stock, featured) VALUES
('Mechero Electrónico Premium Negro',
 'Mechero electrónico recargable con diseño elegante en color negro mate. Encendido por arco eléctrico, resistente al viento. Puerto de carga USB incluido. Ideal para uso diario.',
 12.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Recargable USB',
 30,
 false),

('Mechero Electrónico Metálico Plateado',
 'Mechero de encendido electrónico con acabado metálico plateado. Sistema de arco eléctrico de doble haz. Recargable por USB con indicador LED de batería.',
 12.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Recargable USB',
 30,
 false),

('Mechero Clásico Azul Translúcido',
 'Mechero desechable con carcasa translúcida en tono azul. Sistema de encendido por rueda tradicional. Llama regulable. Diseño ergonómico y ligero.',
 3.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Desechable',
 50,
 false),

('Mechero Clásico Rojo Translúcido',
 'Mechero desechable con carcasa translúcida en tono rojo intenso. Encendido tradicional con rueda. Llama ajustable según necesidad.',
 3.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Desechable',
 50,
 false),

('Mechero Clásico Verde Translúcido',
 'Mechero desechable con carcasa translúcida en tono verde. Sistema de encendido por rueda clásico. Compacto y práctico para llevar siempre contigo.',
 3.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Desechable',
 50,
 false),

('Mechero Torch Profesional',
 'Mechero tipo soplete con llama potente de hasta 1300°C. Ideal para uso intensivo. Recargable con gas butano. Base antideslizante y seguro de encendido.',
 18.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Recargable gas',
 20,
 true),

('Mechero Electrónico Dorado',
 'Mechero electrónico premium con acabado dorado brillante. Encendido por arco eléctrico doble. Resistente al viento y agua. Carga rápida USB-C.',
 15.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Recargable USB-C',
 25,
 false),

('Mechero Edición Especial Camuflaje',
 'Mechero con diseño de camuflaje militar. Carcasa resistente a golpes. Encendido tradicional con rueda de acero. Llama potente y regulable.',
 5.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Desechable',
 40,
 false),

('Mechero Slim Negro Mate',
 'Mechero ultradelgado de perfil bajo con acabado negro mate. Perfecto para llevar en el bolsillo. Encendido suave y fiable.',
 4.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Desechable',
 45,
 false),

('Mechero Turbo Transparente',
 'Mechero con llama turbo visible a través de carcasa transparente. Recargable con gas. Ideal para exteriores. Sistema de seguridad infantil.',
 8.00,
 'https://images.pexels.com/photos/1749900/pexels-photo-1749900.jpeg',
 'mechero',
 'Sin aroma',
 'Recargable gas',
 35,
 false);

-- Accesorios (5 productos: 2 estuches + 3 accesorios)
INSERT INTO products (name, description, price, image_url, category, flavor, format, stock, featured) VALUES
('Estuche Premium para 2 Vapers - Negro',
 'Estuche protector de diseño elegante en color negro. Fabricado en material EVA resistente a golpes. Capacidad para 2 vapers más accesorios pequeños. Cierre con cremallera y correa para transporte. Interior acolchado.',
 15.00,
 'https://images.pexels.com/photos/4553277/pexels-photo-4553277.jpeg',
 'accesorio',
 'N/A',
 'EVA - 2 vapers',
 40,
 true),

('Estuche Compacto Individual - Gris',
 'Estuche compacto para 1 vaper. Material de neopreno suave con protección reforzada. Color gris con logo discreto. Mosquetón incluido para colgar en mochila o cinturón.',
 8.00,
 'https://images.pexels.com/photos/4553277/pexels-photo-4553277.jpeg',
 'accesorio',
 'N/A',
 'Neopreno - 1 vaper',
 50,
 false),

('Cargador USB Universal Dual',
 'Cargador de pared con 2 puertos USB y cable micro-USB incluido. Compatible con vapers recargables. Protección contra sobrecarga. Compacto y portátil.',
 10.00,
 'https://images.pexels.com/photos/4553277/pexels-photo-4553277.jpeg',
 'accesorio',
 'N/A',
 'Dual USB 2.4A',
 30,
 false),

('Cordón de Transporte Ajustable',
 'Cordón textil trenzado con enganches universales para vaper. Longitud ajustable de 45 a 60cm. Resistente y cómodo. Varios colores disponibles: negro, gris, verde.',
 5.00,
 'https://images.pexels.com/photos/4553277/pexels-photo-4553277.jpeg',
 'accesorio',
 'N/A',
 'Textil ajustable',
 60,
 false),

('Kit de Limpieza y Mantenimiento',
 'Kit completo con hisopos especiales, líquido limpiador y paño de microfibra. Ideal para mantener tu vaper en óptimas condiciones. Práctico estuche transparente incluido.',
 12.00,
 'https://images.pexels.com/photos/4553277/pexels-photo-4553277.jpeg',
 'accesorio',
 'N/A',
 'Kit completo',
 25,
 false);
