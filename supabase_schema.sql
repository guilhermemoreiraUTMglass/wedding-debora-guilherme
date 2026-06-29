-- =============================================
-- SCHEMA — Wedding Gift List
-- Execute no Supabase SQL Editor
-- =============================================

-- Tabela de configuração do casamento
CREATE TABLE IF NOT EXISTS wedding_config (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bride        TEXT NOT NULL DEFAULT 'Débora',
  groom        TEXT NOT NULL DEFAULT 'Guilherme',
  wedding_date TIMESTAMPTZ NOT NULL DEFAULT '2025-08-29T18:00:00Z',
  date_display TEXT NOT NULL DEFAULT '29 de Agosto de 2025',
  venue_name   TEXT,
  venue_address TEXT,
  ceremony_time TEXT DEFAULT '18h00',
  reception_time TEXT DEFAULT '17h30',
  whatsapp_number TEXT NOT NULL DEFAULT '5500000000000',
  cover_photo_url TEXT,
  couple_photo_url TEXT,
  message      TEXT DEFAULT 'Querido amigo, sua presença já é o nosso maior presente.',
  bible_verse  TEXT DEFAULT 'Assim, eles já não são dois, mas uma só carne.',
  bible_ref    TEXT DEFAULT 'Mateus 19:6',
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Tabela de presentes
CREATE TABLE IF NOT EXISTS gifts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  category    TEXT NOT NULL CHECK (category IN ('cozinha','quarto','sala','decoracao','eletronicos','outros')),
  status      TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','chosen')),
  chosen_by   TEXT,
  chosen_at   TIMESTAMPTZ,
  image_url   TEXT,
  emoji       TEXT DEFAULT '🎁',
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tabela de reservas temporárias (5 min)
CREATE TABLE IF NOT EXISTS gift_reservations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_id    UUID REFERENCES gifts(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '5 minutes'),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── RLS (Row Level Security) ────────────────────────────────────────────────
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_reservations ENABLE ROW LEVEL SECURITY;

-- Leitura pública dos presentes
CREATE POLICY "gifts_select" ON gifts FOR SELECT USING (true);

-- Atualização pública (guest escolhe presente)
CREATE POLICY "gifts_update" ON gifts FOR UPDATE USING (true);

-- Leitura pública da config
CREATE POLICY "config_select" ON wedding_config FOR SELECT USING (true);

-- Reservas: qualquer um pode criar/ver/deletar
CREATE POLICY "reservations_all" ON gift_reservations FOR ALL USING (true);

-- ─── ÍNDICES ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS gifts_status_idx ON gifts (status);
CREATE INDEX IF NOT EXISTS gifts_category_idx ON gifts (category);
CREATE INDEX IF NOT EXISTS reservations_expires_idx ON gift_reservations (expires_at);

-- ─── SEED DATA ────────────────────────────────────────────────────────────────
INSERT INTO wedding_config (bride, groom, whatsapp_number) VALUES ('Débora', 'Guilherme', '5500000000000');

INSERT INTO gifts (name, description, category, emoji, sort_order) VALUES
  ('Air Fryer',            'Para pratos saudáveis e saborosos no dia a dia.',              'cozinha',    '🍳', 1),
  ('Jogo de Panelas',      'Conjunto completo de panelas antiaderentes premium.',           'cozinha',    '🥘', 2),
  ('Guarda-Roupa Casal',   'Roupeiro espaçoso com espelho e gavetas internas.',            'quarto',     '🪞', 3),
  ('Sofá 3 Lugares',       'Sofá confortável em tecido suede bege.',                       'sala',       '🛋️', 4),
  ('Smart TV 55"',         'Televisão 4K com sistema operacional inteligente.',            'eletronicos','📺', 5),
  ('Jogo de Cama Queen',   'Lençóis de algodão egípcio 400 fios, tom champagne.',         'quarto',     '🛏️', 6),
  ('Batedeira Planetária', 'Para tortas, bolos e muito amor na cozinha.',                 'cozinha',    '🎂', 7),
  ('Aparelho de Jantar',   'Conjunto para 12 pessoas em porcelana branca.',               'cozinha',    '🍽️', 8),
  ('Quadro Decorativo',    'Arte minimalista para a sala de estar.',                       'decoracao',  '🖼️', 9),
  ('Máquina de Café',      'Espresso profissional para o casal.',                         'cozinha',    '☕', 10),
  ('Luminária de Piso',    'Luminária moderna para sala ou quarto.',                      'decoracao',  '💡', 11),
  ('Aspirador Robot',      'Limpeza automática sem esforço.',                             'eletronicos','🤖', 12),
  ('Tapete Sala',          'Tapete artesanal 2x3m em tons neutros.',                     'decoracao',  '🟫', 13),
  ('Adega Climatizada',    'Para conservar seus vinhos favoritos.',                       'sala',       '🍷', 14),
  ('Caixa de Som Bluetooth','Som de qualidade para os momentos especiais.',              'eletronicos','🔊', 15);

-- ─── FUNÇÃO: limpar reservas expiradas ───────────────────────────────────────
CREATE OR REPLACE FUNCTION cleanup_expired_reservations()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM gift_reservations WHERE expires_at < now();
END;
$$;

-- Agendar limpeza automática (requer pg_cron no Supabase Pro)
-- SELECT cron.schedule('cleanup-reservations', '*/5 * * * *', 'SELECT cleanup_expired_reservations()');
