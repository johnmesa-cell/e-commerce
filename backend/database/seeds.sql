USE ecommerce;

-- Insertar usuario administrador (contraseña: admin123)
INSERT INTO usuarios (nombre, email, password, role) VALUES
('Administrador', 'admin@musicstore.com', '$2b$10$X5xKQCJJ5QkGZJ5QkGZJ5u8vYwQYwQYwQYwQYwQYwQYwQYwQYwQYw', 'admin'),
('John Mesa', 'john.mesa@utp.edu.co', '$2b$10$X5xKQCJJ5QkGZJ5QkGZJ5u8vYwQYwQYwQYwQYwQYwQYwQYwQYwQYw', 'cliente');

-- Insertar categorías de instrumentos musicales
INSERT INTO categorias (nombre, descripcion) VALUES
('Guitarras', 'Guitarras acústicas, eléctricas y bajos'),
('Teclados y Pianos', 'Pianos digitales, sintetizadores y teclados MIDI'),
('Batería y Percusión', 'Baterías acústicas, electrónicas y instrumentos de percusión'),
('Vientos', 'Instrumentos de viento madera y metal'),
('Cuerdas', 'Violines, violas, violonchelos y contrabajos'),
('Accesorios', 'Cables, soportes, fundas y pedales'),
('Audio Profesional', 'Interfaces de audio, micrófonos y monitores de estudio'),
('DJ y Producción', 'Controladoras, mezcladores y equipos para DJ');

-- Insertar productos de instrumentos musicales
INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, imagen_url) VALUES
-- Guitarras
('Guitarra Acústica Yamaha F310', 'Guitarra acústica para principiantes, tapa de abeto', 450000, 25, 1, 'https://ejemplo.com/yamaha-f310.jpg'),
('Guitarra Eléctrica Fender Stratocaster', 'Guitarra eléctrica clásica con 3 pastillas single coil', 3200000, 10, 1, 'https://ejemplo.com/fender-strat.jpg'),
('Bajo Eléctrico Ibanez SR300E', 'Bajo de 4 cuerdas con electrónica activa', 1850000, 15, 1, 'https://ejemplo.com/ibanez-bass.jpg'),
('Guitarra Electroacústica Taylor 214ce', 'Guitarra electroacústica con cutaway y previo ES2', 4500000, 8, 1, 'https://ejemplo.com/taylor-214.jpg'),
('Guitarra Clásica Alhambra 1C', 'Guitarra española con tapa de cedro macizo', 980000, 20, 1, 'https://ejemplo.com/alhambra-1c.jpg'),

-- Teclados y Pianos
('Piano Digital Yamaha P-45', 'Piano digital de 88 teclas con acción de martillo', 1950000, 12, 2, 'https://ejemplo.com/yamaha-p45.jpg'),
('Teclado Casio CT-S300', 'Teclado portátil de 61 teclas con 400 tonos', 520000, 30, 2, 'https://ejemplo.com/casio-cts300.jpg'),
('Sintetizador Korg Minilogue XD', 'Sintetizador analógico polifónico de 4 voces', 3800000, 6, 2, 'https://ejemplo.com/korg-minilogue.jpg'),
('Piano Digital Roland FP-30X', 'Piano portátil con altavoces integrados y Bluetooth', 2650000, 10, 2, 'https://ejemplo.com/roland-fp30x.jpg'),

-- Batería y Percusión
('Batería Acústica Pearl Export', 'Kit completo de 5 piezas con herrajes', 3500000, 5, 3, 'https://ejemplo.com/pearl-export.jpg'),
('Batería Electrónica Alesis Nitro Mesh', 'Batería digital con pads de malla y módulo de sonido', 2100000, 8, 3, 'https://ejemplo.com/alesis-nitro.jpg'),
('Cajón Peruano LP Aspire', 'Cajón flamenco con cuerdas ajustables', 380000, 35, 3, 'https://ejemplo.com/lp-cajon.jpg'),
('Congas LP Matador', 'Par de congas de fibra de vidrio 10" y 11"', 1650000, 12, 3, 'https://ejemplo.com/lp-congas.jpg'),

-- Vientos
('Saxofón Alto Yamaha YAS-280', 'Saxofón alto para estudiantes con estuche', 4200000, 7, 4, 'https://ejemplo.com/yamaha-sax.jpg'),
('Flauta Traversa Yamaha YFL-222', 'Flauta de plata alemana para principiantes', 1450000, 15, 4, 'https://ejemplo.com/yamaha-flauta.jpg'),
('Trompeta Bach TR300H2', 'Trompeta Bb con campana de latón lacado', 2300000, 10, 4, 'https://ejemplo.com/bach-trompeta.jpg'),
('Clarinete Buffet E11', 'Clarinete profesional en Bb con sistema Boehm', 3900000, 6, 4, 'https://ejemplo.com/buffet-clarinete.jpg'),

-- Cuerdas
('Violín Stentor Student I 4/4', 'Violín completo para estudiantes con arco y estuche', 850000, 18, 5, 'https://ejemplo.com/stentor-violin.jpg'),
('Violonchelo Cremona SC-175 4/4', 'Violonchelo de estudio con tapa de abeto', 2800000, 5, 5, 'https://ejemplo.com/cremona-cello.jpg'),
('Ukelele Kala KA-15S Soprano', 'Ukelele soprano de caoba con funda', 280000, 40, 5, 'https://ejemplo.com/kala-ukulele.jpg'),

-- Accesorios
('Cable Instrumento Monster Cable 6m', 'Cable profesional para guitarra y bajo', 85000, 60, 6, 'https://ejemplo.com/monster-cable.jpg'),
('Pedal Overdrive Boss OD-3', 'Pedal de overdrive para guitarra', 420000, 25, 6, 'https://ejemplo.com/boss-od3.jpg'),
('Soporte para Guitarra Hercules GS414B', 'Soporte universal con bloqueo automático', 95000, 45, 6, 'https://ejemplo.com/hercules-stand.jpg'),
('Afinador Cromático Boss TU-3', 'Afinador de pedal con display LED', 380000, 30, 6, 'https://ejemplo.com/boss-tu3.jpg'),
('Cuerdas Guitarra Eléctrica Ernie Ball 10-46', 'Set de cuerdas calibre regular', 35000, 120, 6, 'https://ejemplo.com/ernie-ball.jpg'),

-- Audio Profesional
('Interfaz de Audio Focusrite Scarlett 2i2', 'Interfaz USB de 2 entradas con previos de calidad', 650000, 22, 7, 'https://ejemplo.com/scarlett-2i2.jpg'),
('Micrófono Shure SM57', 'Micrófono dinámico para instrumentos y voces', 480000, 35, 7, 'https://ejemplo.com/shure-sm57.jpg'),
('Monitores de Estudio KRK Rokit 5 G4 (Par)', 'Monitores activos de 5 pulgadas', 1850000, 15, 7, 'https://ejemplo.com/krk-rokit5.jpg'),
('Micrófono Condensador Audio-Technica AT2020', 'Micrófono de condensador cardioide XLR', 520000, 28, 7, 'https://ejemplo.com/at2020.jpg'),

-- DJ y Producción
('Controladora DJ Pioneer DDJ-400', 'Controladora de 2 canales para rekordbox', 1450000, 12, 8, 'https://ejemplo.com/pioneer-ddj400.jpg'),
('Mezclador DJ Behringer DJX750', 'Mezclador profesional de 5 canales', 980000, 10, 8, 'https://ejemplo.com/behringer-djx750.jpg'),
('Controlador MIDI Akai MPK Mini', 'Teclado controlador MIDI compacto de 25 teclas', 380000, 25, 8, 'https://ejemplo.com/akai-mpk.jpg');

-- Insertar un pedido de ejemplo
INSERT INTO pedidos (usuario_id, total, estado) VALUES
(2, 1070000, 'entregado');

-- Insertar detalle del pedido
INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 450000, 450000),
(1, 7, 1, 520000, 520000),
(1, 25, 2, 50000, 100000);

-- Insertar reseñas de ejemplo
INSERT INTO resenas (producto_id, usuario_id, calificacion, comentario) VALUES
(1, 2, 5, 'Excelente guitarra para principiantes, muy buena calidad y sonido'),
(7, 2, 5, 'Teclado perfecto para empezar a aprender, buena relación calidad-precio'),
(28, 2, 4, 'Interfaz de audio con excelente calidad, muy fácil de configurar');
