
create table if not exists public.product (
  id           integer primary key,
  name         text not null,
  category     text not null default 'Skincare',
  price        text not null,
  "oldPrice"   text,
  rating       numeric default 5,
  badge        text,
  image        text,
  "hoverImage" text,
  description  text,
  sizes        jsonb default '[]'::jsonb,
  ingredients  text,
  usage        text
);


create table if not exists public."order" (
  order_id       text primary key,
  payment_id     text,
  name           text not null,
  email          text not null,
  phone          text not null,
  address        text not null,
  city           text not null,
  state          text not null,
  pincode        text not null,
  products       text not null,         
  total_amount   numeric not null,
  payment_status text not null default 'pending',
  payment_method text,
  order_source   text,
  tracking_id    text,
  time_stamp     timestamptz not null default now()
);


alter table public.product enable row level security;
alter table public."order" enable row level security;

drop policy if exists "Public read products" on public.product;
create policy "Public read products"
  on public.product for select
  using (true);
