-- CreateTable
CREATE TABLE "categorias" (
    "id_categoria" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "creado_categoria" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id_evento" BIGSERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "ubicacion" VARCHAR(150),
    "fecha_inicio" TIMESTAMP(6) NOT NULL,
    "fecha_fin" TIMESTAMP(6) NOT NULL,
    "precio" DECIMAL(10,2) DEFAULT 0.00,
    "imagen" VARCHAR(200),
    "id_categoria" BIGINT NOT NULL,
    "creado_evento" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "actualizado_evento" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "pagos" (
    "id_pago" BIGSERIAL NOT NULL,
    "id_usuario" BIGINT,
    "monto" DECIMAL(10,2) NOT NULL,
    "metodo_pago" VARCHAR(50) NOT NULL DEFAULT 'Visa',
    "estado_pago" VARCHAR(20) DEFAULT 'PAGADO',
    "fecha_pago" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id_pago")
);

-- CreateTable
CREATE TABLE "registros" (
    "id_registro" BIGSERIAL NOT NULL,
    "id_usuario" BIGINT NOT NULL,
    "id_evento" BIGINT NOT NULL,
    "id_pago" BIGINT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id_registro")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "apellidos" VARCHAR(100),
    "foto_perfil" VARCHAR(500),
    "correo" VARCHAR(100) NOT NULL,
    "contrasena" VARCHAR(100),
    "google_id" VARCHAR(100),
    "activo" BOOLEAN DEFAULT true,
    "rol" VARCHAR(10) DEFAULT 'USUARIO',
    "creado_en" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nombre_key" ON "categorias"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_google_id_key" ON "usuarios"("google_id");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registros" ADD CONSTRAINT "registros_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "eventos"("id_evento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registros" ADD CONSTRAINT "registros_id_pago_fkey" FOREIGN KEY ("id_pago") REFERENCES "pagos"("id_pago") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registros" ADD CONSTRAINT "registros_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
