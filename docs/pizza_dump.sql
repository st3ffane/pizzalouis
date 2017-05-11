--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: ingredient_type; Type: TYPE; Schema: public; Owner: louis
--

CREATE TYPE ingredient_type AS ENUM (
    'base',
    'top'
);


ALTER TYPE ingredient_type OWNER TO louis;

--
-- Name: publish_state; Type: TYPE; Schema: public; Owner: louis
--

CREATE TYPE publish_state AS ENUM (
    'waiting',
    'published'
);


ALTER TYPE publish_state OWNER TO louis;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: category; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE category (
    nom character varying(50) NOT NULL
);


ALTER TABLE category OWNER TO louis;

--
-- Name: commandes; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE commandes (
    id bigint NOT NULL,
    date_cmd timestamp without time zone DEFAULT now() NOT NULL,
    date_retrait timestamp without time zone NOT NULL,
    id_client bigint NOT NULL,
    payement_id character varying(50) NOT NULL,
    prix numeric DEFAULT 10,
    CONSTRAINT chkdate CHECK (((date_retrait > date_cmd) AND ((date_retrait)::time without time zone > '18:00:00'::time without time zone) AND ((date_retrait)::time without time zone < '23:00:00'::time without time zone))),
    CONSTRAINT commandes_prix_check CHECK ((prix > (1)::numeric)),
    location point
);


ALTER TABLE commandes OWNER TO louis;

--
-- Name: commandes_id_seq; Type: SEQUENCE; Schema: public; Owner: louis
--

CREATE SEQUENCE commandes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE commandes_id_seq OWNER TO louis;

--
-- Name: commandes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: louis
--

ALTER SEQUENCE commandes_id_seq OWNED BY commandes.id;


--
-- Name: commandes_pizzas; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE commandes_pizzas (
    id_commande bigint NOT NULL,
    id_pizza bigint NOT NULL,
    qtte numeric DEFAULT 1,
    size boolean DEFAULT false,
    CONSTRAINT chkqtte CHECK ((qtte > (0)::numeric))
);


ALTER TABLE commandes_pizzas OWNER TO louis;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE comments (
    id bigint NOT NULL,
    id_user bigint,
    date timestamp without time zone DEFAULT now() NOT NULL,
    texte text NOT NULL,
    etat publish_state DEFAULT 'waiting'::publish_state NOT NULL,
    note integer DEFAULT 0
);


ALTER TABLE comments OWNER TO louis;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: louis
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_id_seq OWNER TO louis;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: louis
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: comments_news; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE comments_news (
    id_comment bigint,
    id_news bigint
);


ALTER TABLE comments_news OWNER TO louis;

--
-- Name: comments_pizzas; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE comments_pizzas (
    id_comment bigint,
    id_pizza bigint
);


ALTER TABLE comments_pizzas OWNER TO louis;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE ingredients (
    id bigint NOT NULL,
    nom character varying(50) NOT NULL,
    type ingredient_type DEFAULT 'top'::ingredient_type NOT NULL,
    dispo boolean DEFAULT true,
    description text NOT NULL,
    icon character varying(50) DEFAULT 'ing.png'::character varying
);


ALTER TABLE ingredients OWNER TO louis;

--
-- Name: ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: louis
--

CREATE SEQUENCE ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ingredients_id_seq OWNER TO louis;

--
-- Name: ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: louis
--

ALTER SEQUENCE ingredients_id_seq OWNED BY ingredients.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE news (
    id bigint NOT NULL,
    date_pub timestamp without time zone DEFAULT now(),
    title character varying(40) NOT NULL,
    texte text NOT NULL,
    picture character varying(40) NOT NULL
);


ALTER TABLE news OWNER TO louis;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: louis
--

CREATE SEQUENCE news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE news_id_seq OWNER TO louis;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: louis
--

ALTER SEQUENCE news_id_seq OWNED BY news.id;


--
-- Name: pizza_ingredient; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE pizza_ingredient (
    id_pizza bigint,
    id_ingredient bigint
);


ALTER TABLE pizza_ingredient OWNER TO louis;

--
-- Name: pizzas; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE pizzas (
    id bigint NOT NULL,
    id_base bigint NOT NULL,
    nom character varying(50) NOT NULL,
    slogan text NOT NULL,
    picture character varying(50) NOT NULL,
    long_desc text,
    prix_small numeric NOT NULL,
    prix_big numeric NOT NULL,
    stars integer DEFAULT 0,
    category character varying(50) NOT NULL
);


ALTER TABLE pizzas OWNER TO louis;

--
-- Name: pizzas_id_seq; Type: SEQUENCE; Schema: public; Owner: louis
--

CREATE SEQUENCE pizzas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pizzas_id_seq OWNER TO louis;

--
-- Name: pizzas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: louis
--

ALTER SEQUENCE pizzas_id_seq OWNED BY pizzas.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE users (
    id bigint NOT NULL,
    nom character varying(40) NOT NULL,
    prenom character varying(40),
    login character varying(40) NOT NULL,
    passwrd character varying(40) NOT NULL,
    tel character varying(10) NOT NULL,
    mail character varying(40)
);


ALTER TABLE users OWNER TO louis;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: louis
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO louis;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: louis
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: commandes id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes ALTER COLUMN id SET DEFAULT nextval('commandes_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: ingredients id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY ingredients ALTER COLUMN id SET DEFAULT nextval('ingredients_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY news ALTER COLUMN id SET DEFAULT nextval('news_id_seq'::regclass);


--
-- Name: pizzas id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizzas ALTER COLUMN id SET DEFAULT nextval('pizzas_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY category (nom) FROM stdin;
Traditionnelle
Regionnale
Voyageuse
Du Chef
\.


--
-- Data for Name: commandes; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY commandes (id, date_cmd, date_retrait, id_client, payement_id, prix, location) FROM stdin;
1	2017-04-20 12:00:00	2017-04-20 19:00:00	1	125	10	(43.668137999999999,-1.107599)
2	2017-04-20 12:12:00	2017-04-20 19:20:00	2	125	10	(43.668764000000003,-1.10820600000000002)
3	2017-04-20 17:00:00	2017-04-20 20:00:00	3	125	10	(43.6699040000000025,-1.10888999999999993)
4	2017-04-21 12:00:00	2017-04-21 19:00:00	4	125	10	(43.6705249999999978,-1.108128)
5	2017-04-22 12:00:00	2017-04-22 19:30:00	4	125	10	(43.6700360000000032,-1.11025200000000002)
6	2017-04-22 12:00:00	2017-04-22 18:30:00	5	125	10	(43.6703460000000021,-1.11053099999999993)
7	2017-04-23 12:00:00	2017-04-23 20:00:00	5	125	10	(43.6694230000000019,-1.11042400000000008)
8	2017-04-24 12:00:00	2017-04-24 20:00:00	1	125	10	(43.6693449999999999,-1.10994100000000007)
9	2017-04-25 12:00:00	2017-04-25 19:30:00	6	125	10	(43.6693059999999988,-1.11102499999999993)
10	2017-04-25 12:00:00	2017-04-25 19:00:00	7	125	10	(43.6688329999999993,-1.10995200000000005)
\.


--
-- Name: commandes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('commandes_id_seq', 10, true);


--
-- Data for Name: commandes_pizzas; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY commandes_pizzas (id_commande, id_pizza, qtte, size) FROM stdin;
1	1	1	t
1	2	1	t
2	3	1	t
3	5	1	t
3	3	1	f
4	3	1	f
5	2	2	t
6	1	1	t
7	4	1	t
8	3	1	t
9	5	2	t
10	3	1	f
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY comments (id, id_user, date, texte, etat, note) FROM stdin;
22	9	2017-04-27 12:36:24	Super bonne, tres bien	published	2
23	2	2017-04-28 12:36:24	Super bonne, tres bien	published	5
24	3	2017-04-28 12:36:24	Super bonne, tres bien	published	5
25	3	2017-04-27 12:36:24	Super bonne, tres bien	published	1
26	5	2017-04-27 12:36:24	Super bonne, tres bien	published	3
27	8	2017-04-27 12:36:24	Super bonne, tres bien	published	3
28	7	2017-04-27 12:36:24	Super bonne, tres bien	published	2
29	7	2017-04-27 12:36:24	Super bonne, tres bien	published	1
30	6	2017-04-27 12:36:24	Super bonne, tres bien	published	3
31	10	2017-04-27 12:36:24	Super bonne, tres bien	published	4
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('comments_id_seq', 31, true);


--
-- Data for Name: comments_news; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY comments_news (id_comment, id_news) FROM stdin;
28	1
29	2
30	2
31	5
\.


--
-- Data for Name: comments_pizzas; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY comments_pizzas (id_comment, id_pizza) FROM stdin;
22	1
23	1
24	2
25	5
26	5
27	3
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY ingredients (id, nom, type, dispo, description, icon) FROM stdin;
1	sauce blanche	base	t	sauce creme fraiche...	cream.png
2	sauce tomate	base	t	sauce tomate fraiche faite maison	tomate.png
3	sauce mexicaine	base	t	sauce épicée	mexican.png
4	tomate confite	top	t	au soleil de scicile	sec.png
5	magret fumé	top	t	provennance des landes	magret.png
6	gran parano	top	t	fromage italien super bon	magret.png
7	mozzarela di buffala	top	t	faiet en italie, super bonne	magret.png
8	Gruyere AOP	top	t	rien a dire	magret.png
9	Coppa	top	t	charcuterie	magret.png
10	Jambon Serrano	top	t	Espagna	magret.png
11	chorizo	top	t	provennance Andalousie	magret.png
\.


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('ingredients_id_seq', 11, true);


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY news (id, date_pub, title, texte, picture) FROM stdin;
1	2017-04-20 12:00:00	Bonjour tout le monde	lorem ipsum dolor sit amet et caetera parceque a la fin ca soule un peu	news1.png
2	2017-04-20 13:00:00	Bonjour tout le monde1	lorem ipsum dolor sit amet et caetera parceque a la fin ca soule un peu	news1.png
3	2017-04-20 14:00:00	Bonjour tout le monde2	lorem ipsum dolor sit amet et caetera parceque a la fin ca soule un peu	news1.png
4	2017-04-20 15:00:00	Bonjour tout le monde3	lorem ipsum dolor sit amet et caetera parceque a la fin ca soule un peu	news1.png
5	2017-04-20 16:00:00	Bonjour tout le monde4	lorem ipsum dolor sit amet et caetera parceque a la fin ca soule un peu	news1.png
6	2017-04-20 17:00:00	Bonjour tout le monde5	lorem ipsum dolor sit amet et caetera parceque a la fin ca soule un peu	news1.png
\.


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('news_id_seq', 6, true);


--
-- Data for Name: pizza_ingredient; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY pizza_ingredient (id_pizza, id_ingredient) FROM stdin;
1	4
1	5
1	6
2	4
2	7
2	8
2	9
3	6
3	10
3	11
4	5
4	11
4	10
5	5
5	8
5	10
5	11
5	8
\.


--
-- Data for Name: pizzas; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY pizzas (id, id_base, nom, slogan, picture, long_desc, prix_small, prix_big, stars, category) FROM stdin;
1	3	Hot&chili	forte a vous arracher la langue	hot.png	une longue descprition si besoin	7.99	12.99	2	Voyageuse
2	2	Milano	simple et efficace	hot.png	une longue descprition si besoin	6.99	10.99	3	Traditionnelle
3	3	Copparella	Invention labellisé	hot.png	une longue descprition si besoin	9.99	15.99	1	Du Chef
4	1	Perra&Marco	des vrais morceaux de marco dedans	hot.png	une longue descprition si besoin	7.99	12.99	2	Du Chef
5	2	Landaise	parceque	hot.png	une longue descprition si besoin	8.99	13.99	0	Regionnale
\.


--
-- Name: pizzas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('pizzas_id_seq', 5, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY users (id, nom, prenom, login, passwrd, tel, mail) FROM stdin;
1	PONTEINS	Stéphane	steff	steff	0558901538	steph@helo.com
2	DOE	Joe	joe	joe	0558901538	steph@helo.com
3	ARC	Janne	Janne	Janne	0558901538	steph@helo.com
4	Lorraine	Janine	Janine	Janine	0558901538	steph@helo.com
5	Larrère	Brice	Brice	Brice	0558901538	steph@helo.com
6	Anderson	Pam	Pam	Pam	0558901538	steph@helo.com
7	Richard	Richard	Richard	Richard	0558901538	steph@helo.com
8	Lous	Louis	Louis	Louis	0558901538	steph@helo.com
9	Chang	jacky	jacky	jacky	0558901538	steph@helo.com
10	Lee	Bruce	Bruce	Bruce	0558901538	steph@helo.com
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('users_id_seq', 10, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (nom);


--
-- Name: commandes commandes_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes
    ADD CONSTRAINT commandes_pkey PRIMARY KEY (id);


--
-- Name: comments_news comments_news_id_comment_key; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_news
    ADD CONSTRAINT comments_news_id_comment_key UNIQUE (id_comment);


--
-- Name: comments_pizzas comments_pizza_id_comment_key; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_pizzas
    ADD CONSTRAINT comments_pizza_id_comment_key UNIQUE (id_comment);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: pizzas pizzas_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizzas
    ADD CONSTRAINT pizzas_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: commandes commandes_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes
    ADD CONSTRAINT commandes_id_client_fkey FOREIGN KEY (id_client) REFERENCES users(id);


--
-- Name: commandes_pizzas commandes_pizzas_id_commande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes_pizzas
    ADD CONSTRAINT commandes_pizzas_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES commandes(id);


--
-- Name: commandes_pizzas commandes_pizzas_id_pizza_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes_pizzas
    ADD CONSTRAINT commandes_pizzas_id_pizza_fkey FOREIGN KEY (id_pizza) REFERENCES pizzas(id);


--
-- Name: comments comments_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_id_user_fkey FOREIGN KEY (id_user) REFERENCES users(id);


--
-- Name: comments_news comments_news_id_comment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_news
    ADD CONSTRAINT comments_news_id_comment_fkey FOREIGN KEY (id_comment) REFERENCES comments(id);


--
-- Name: comments_news comments_news_id_news_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_news
    ADD CONSTRAINT comments_news_id_news_fkey FOREIGN KEY (id_news) REFERENCES news(id);


--
-- Name: comments_pizzas comments_pizza_id_comment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_pizzas
    ADD CONSTRAINT comments_pizza_id_comment_fkey FOREIGN KEY (id_comment) REFERENCES comments(id);


--
-- Name: comments_pizzas comments_pizza_id_pizza_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_pizzas
    ADD CONSTRAINT comments_pizza_id_pizza_fkey FOREIGN KEY (id_pizza) REFERENCES pizzas(id);


--
-- Name: pizza_ingredient pizza_ingredient_id_ingredient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizza_ingredient
    ADD CONSTRAINT pizza_ingredient_id_ingredient_fkey FOREIGN KEY (id_ingredient) REFERENCES ingredients(id);


--
-- Name: pizza_ingredient pizza_ingredient_id_pizza_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizza_ingredient
    ADD CONSTRAINT pizza_ingredient_id_pizza_fkey FOREIGN KEY (id_pizza) REFERENCES pizzas(id);


--
-- Name: pizzas pizzas_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizzas
    ADD CONSTRAINT pizzas_category_fkey FOREIGN KEY (category) REFERENCES category(nom);


--
-- Name: pizzas pizzas_id_base_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizzas
    ADD CONSTRAINT pizzas_id_base_fkey FOREIGN KEY (id_base) REFERENCES ingredients(id);


--
-- PostgreSQL database dump complete
--

