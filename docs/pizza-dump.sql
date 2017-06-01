--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


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
    nom character varying(50) NOT NULL,
    description text
);


ALTER TABLE category OWNER TO louis;

--
-- Name: commandes; Type: TABLE; Schema: public; Owner: louis
--

CREATE TABLE commandes (
    id bigint NOT NULL,
    date_cmd timestamp with time zone DEFAULT now() NOT NULL,
    date_retrait timestamp with time zone NOT NULL,
    id_client bigint NOT NULL,
    payement_id character varying(50) NOT NULL,
    prix numeric DEFAULT 10,
    location point,
    message text,
    CONSTRAINT chkdate CHECK (((date_retrait > date_cmd) AND ((date_retrait)::time with time zone > '17:29:59+02'::time with time zone) AND ((date_retrait)::time with time zone < '21:30:01+02'::time with time zone))),
    CONSTRAINT commandes_prix_check CHECK ((prix > (1)::numeric))
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
    id bigint NOT NULL,
    CONSTRAINT chkqtte CHECK ((qtte > (0)::numeric))
);


ALTER TABLE commandes_pizzas OWNER TO louis;

--
-- Name: commandes_pizzas_id_seq; Type: SEQUENCE; Schema: public; Owner: louis
--

CREATE SEQUENCE commandes_pizzas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE commandes_pizzas_id_seq OWNER TO louis;

--
-- Name: commandes_pizzas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: louis
--

ALTER SEQUENCE commandes_pizzas_id_seq OWNED BY commandes_pizzas.id;


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
    id_category character varying(50) NOT NULL,
    active boolean DEFAULT true
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
    prenom character varying(40) DEFAULT ''::character varying NOT NULL,
    login character varying(40) NOT NULL,
    passwrd text NOT NULL,
    tel character varying(10),
    mail character varying(40),
    role smallint DEFAULT 0 NOT NULL
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
-- Name: id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes ALTER COLUMN id SET DEFAULT nextval('commandes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes_pizzas ALTER COLUMN id SET DEFAULT nextval('commandes_pizzas_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY ingredients ALTER COLUMN id SET DEFAULT nextval('ingredients_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY news ALTER COLUMN id SET DEFAULT nextval('news_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizzas ALTER COLUMN id SET DEFAULT nextval('pizzas_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: louis
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY category (nom, description) FROM stdin;
Traditionnelle	\N
Regionnale	\N
Voyageuse	\N
Du Chef	\N
\.


--
-- Data for Name: commandes; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY commandes (id, date_cmd, date_retrait, id_client, payement_id, prix, location, message) FROM stdin;
1	2017-04-20 12:00:00+02	2017-04-20 19:00:00+02	1	125	10	(43.668137999999999,-1.107599)	\N
2	2017-04-20 12:12:00+02	2017-04-20 19:20:00+02	2	125	10	(43.668764000000003,-1.10820600000000002)	\N
3	2017-04-20 17:00:00+02	2017-04-20 20:00:00+02	3	125	10	(43.6699040000000025,-1.10888999999999993)	\N
4	2017-04-21 12:00:00+02	2017-04-21 19:00:00+02	4	125	10	(43.6705249999999978,-1.108128)	\N
5	2017-04-22 12:00:00+02	2017-04-22 19:30:00+02	4	125	10	(43.6700360000000032,-1.11025200000000002)	\N
6	2017-04-22 12:00:00+02	2017-04-22 18:30:00+02	5	125	10	(43.6703460000000021,-1.11053099999999993)	\N
7	2017-04-23 12:00:00+02	2017-04-23 20:00:00+02	5	125	10	(43.6694230000000019,-1.11042400000000008)	\N
8	2017-04-24 12:00:00+02	2017-04-24 20:00:00+02	1	125	10	(43.6693449999999999,-1.10994100000000007)	\N
9	2017-04-25 12:00:00+02	2017-04-25 19:30:00+02	6	125	10	(43.6693059999999988,-1.11102499999999993)	\N
10	2017-04-25 12:00:00+02	2017-04-25 19:00:00+02	7	125	10	(43.6688329999999993,-1.10995200000000005)	\N
17	2017-05-28 11:00:45.476134+02	2017-05-28 18:30:00+02	1	8kfmqqs9	10	(43.6690699999999978,-1.10535600000000001)	
20	2017-05-28 11:07:05.463594+02	2017-05-28 18:30:00+02	1	bssra9jm	49.07	(43.6690699999999978,-1.10535600000000001)	
21	2017-05-28 13:10:05.33631+02	2017-05-28 20:30:00+02	1	e7g0xt1j	12.99	(43.6690699999999978,-1.10535600000000001)	
22	2017-05-28 13:13:13.634291+02	2017-05-28 17:30:00+02	1	9y9c8z0c	12.99	(43.6690699999999978,-1.10535600000000001)	
23	2017-05-29 08:44:17.867804+02	2017-05-29 20:30:00+02	1	9nv1rbnw	12.99	(43.6690699999999978,-1.10535600000000001)	
24	2017-05-29 08:51:45.942307+02	2017-05-29 17:30:00+02	1	mkscgsm5	8.99	(43.6690699999999978,-1.10535600000000001)	
25	2017-05-29 08:52:58.162124+02	2017-05-29 20:36:00+02	1	rcf1cccq	35.99	(43.6690699999999978,-1.10535600000000001)	supplement Fraises
26	2017-05-29 08:55:21.919167+02	2017-05-29 20:36:00+02	1	fq2kh3je	35.99	(43.6690699999999978,-1.10535600000000001)	supplement Fraises
27	2017-05-29 09:08:07.78731+02	2017-05-29 20:30:00+02	1	d2bgwhm4	13.99	(43.6690699999999978,-1.10535600000000001)	
28	2017-05-29 09:11:15.188737+02	2017-05-29 20:42:00+02	1	5e99we8r	13.99	(43.6690699999999978,-1.10535600000000001)	
29	2017-05-29 09:15:30.01612+02	2017-05-29 19:30:00+02	1	dqetv530	8.99	(43.6690699999999978,-1.10535600000000001)	
30	2017-05-29 09:33:59.261661+02	2017-05-29 18:45:00+02	1	fv7ps3sj	7.99	(43.7086079999999981,-1.05194499999999991)	
31	2017-05-29 09:34:51.467362+02	2017-05-29 19:45:00+02	1	je4x022b	7.99	(43.7086079999999981,-1.05194499999999991)	
32	2017-05-30 08:28:52.222113+02	2017-05-30 17:30:00+02	14	0jajj99x	7.99	(43.6690699999999978,-1.10535600000000001)	
33	2017-05-30 11:21:01.378768+02	2017-05-30 17:30:00+02	1	2s25v2kx	7.99	(43.7086079999999981,-1.05194499999999991)	
34	2017-05-30 15:16:30.281509+02	2017-05-30 17:30:00+02	1	2tqzp9ch	12.99	(43.7086079999999981,-1.05194499999999991)	
35	2017-05-30 17:03:23.740316+02	2017-05-30 19:30:00+02	1	3eweatmv	7.99	(43.7086079999999981,-1.05194499999999991)	
36	2017-06-01 08:27:10.851703+02	2017-06-01 19:30:00+02	16	8crbe7cq	13.9	(43.6690699999999978,-1.10535600000000001)	
37	2017-06-01 08:30:45.077774+02	2017-06-01 19:30:00+02	16	bpebv00t	33.99	(43.6690699999999978,-1.10535600000000001)	
38	2017-06-01 09:02:44.134687+02	2017-06-01 19:30:00+02	1	92cdkp21	44.96	(43.6690699999999978,-1.10535600000000001)	
\.


--
-- Name: commandes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('commandes_id_seq', 38, true);


--
-- Data for Name: commandes_pizzas; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY commandes_pizzas (id_commande, id_pizza, qtte, size, id) FROM stdin;
1	1	1	t	1
1	2	1	t	2
2	3	1	t	3
3	5	1	t	4
3	3	1	f	5
4	3	1	f	6
5	2	2	t	7
6	1	1	t	8
7	4	1	t	9
8	3	1	t	10
9	5	2	t	11
10	3	1	f	12
17	1	1	f	13
17	4	2	t	14
17	32	1	f	15
20	4	2	t	16
20	32	1	f	17
21	4	1	t	18
22	1	1	t	19
23	1	1	t	20
24	5	1	f	21
26	2	1	t	22
26	23	1	f	23
26	23	1	t	24
27	5	1	t	25
28	5	1	t	26
29	5	1	f	27
30	1	1	f	28
31	4	1	f	29
32	1	1	f	30
33	4	1	f	31
34	1	1	t	32
35	1	1	f	33
36	33	1	t	34
37	4	1	f	35
37	23	2	t	36
38	1	1	t	37
38	2	2	t	38
38	3	1	f	39
\.


--
-- Name: commandes_pizzas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('commandes_pizzas_id_seq', 39, true);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY comments (id, id_user, date, texte, etat, note) FROM stdin;
27	8	2017-04-27 12:36:24	Super bonne, tres bien	published	3
29	7	2017-04-27 12:36:24	Super bonne, tres bien	published	1
26	5	2017-04-27 12:36:24	Super bonne, tres bien	waiting	3
22	9	2017-04-27 12:36:24	Super bonne, tres bien	waiting	2
28	7	2017-04-27 12:36:24	Super bonne, tres bien	waiting	2
23	2	2017-04-28 12:36:24	Super bonne, tres bien	published	5
31	10	2017-04-27 12:36:24	Super bonne, tres bien	published	4
24	3	2017-04-28 12:36:24	Super bonne, tres bien	published	5
25	3	2017-04-27 12:36:24	Super bonne, tres bien	waiting	1
30	6	2017-04-27 12:36:24	Super bonne, tres bien	waiting	3
34	1	2017-05-25 13:41:48.86876	tralalalalal	waiting	0
33	1	2017-05-25 13:40:20.448408	bonjour, pourquoi tant de haine et de fureur dans un monde de pizza base tomate?	published	0
32	1	2017-05-25 13:38:12.713032	Bonjour, j'aime bien la pizza	published	0
35	1	2017-05-25 13:42:47.091679	ouah!!! moi aussi, on pourrait etre amis?	published	0
36	1	2017-05-26 08:18:07.184311	rerdrfrfrf	published	0
37	1	2017-05-26 12:02:52.627785	tres excellente, un petit gout de revenez-y!	published	3
38	1	2017-05-26 12:03:49.221688	et encore plus avec un supplement chorizo magret gruyere et poulet coco!	published	2
39	1	2017-05-26 12:08:31.746812	aaaa	published	5
40	1	2017-05-26 12:14:28.351737	dernier test	published	1
41	1	2017-05-26 12:16:20.926767	bonjout	published	2
42	1	2017-05-26 12:17:59.360691	bonjour	published	3
44	16	2017-06-01 06:31:41.018938	fabuleuse, un gout incroyable	published	4
43	16	2017-06-01 06:25:29.912015	ouah super, enfin!	published	0
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('comments_id_seq', 44, true);


--
-- Data for Name: comments_news; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY comments_news (id_comment, id_news) FROM stdin;
28	1
29	2
30	2
31	5
32	13
33	8
34	7
35	13
36	5
43	14
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
37	1
38	1
39	1
40	1
41	23
42	4
44	33
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY ingredients (id, nom, type, dispo, description, icon) FROM stdin;
1	sauce blanche	base	t	sauce creme fraiche...	cream.png
2	sauce tomate	base	t	sauce tomate fraiche faite maison	tomate.png
3	sauce mexicaine	base	t	sauce épicée	mexican.png
7	mozzarela di buffala	top	t	faiet en italie, super bonne	magret.png
8	Gruyere AOP	top	t	rien a dire	magret.png
10	Jambon Serrano	top	t	Espagna	magret.png
17	Sauce Kebab	base	t	sauce blanche avec romarain	ing.png
18	Saucisse de Toulouse	top	t	La vraie, la seule, l&#x27;unique	ing.png
16	Cornichon Russe	top	t	cornichons croquants taille XXL	ing.png
15	Pillipilli	top	t	sauce hot et piquante de fou	ing.png
11	chorizo	top	t	provennance Andalousie, fort et piquant comme un volcan	magret.png
5	magret fumé	top	t	provennance des landes	magret.png
9	Coppa	top	t	charcuterie traditionnelle italienne, decoupe fine	magret.png
4	tomate confite	top	t	au soleil de scicile	sec.png
6	gran parano	top	t	fromage italien super bon vielli 8 ans	magret.png
13	patate douce	top	f	cqdcqcqcqcqc  qsc q qcqsqcqfgef g ezf qf qgzreg ezgegzegz e e	ing.png
19	saumon fumé	top	t	un saumon fumé de norvège, au gout boisé et iodé	ing.png
\.


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('ingredients_id_seq', 19, true);


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
7	2017-05-13 13:07:32.83115	Hello World	dcsdcdsc	test.jpg
8	2017-05-16 11:39:52.560704	Hello everyone	blablabla	test.jpg
9	2017-05-16 12:25:05.474226	sqcdvqdvqdv	dvdqvsvdvd	test.jpg
10	2017-05-16 12:25:14.870405	vsvsdvsdv	dvdvsvddsvsdvsdv	test.jpg
11	2017-05-16 12:25:23.633523	,hgybdf fdbfd	dbfdbbdfbd	test.jpg
13	2017-05-17 05:54:40.644877	AU pays de Candy	comme dans tous les pays, on s'amuse on pleure on rit, il y a des méchants et des gentils	27c06ff9718da1730b8859319b1a6162
14	2017-06-01 06:21:56.648996	Mise en place du site	nous sommes fier de vous annoncer ....	d5dd63676a21404653060ae788653ad7
\.


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('news_id_seq', 14, true);


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
4	5
4	11
4	10
5	5
5	8
5	10
5	11
5	8
23	4
23	5
23	10
23	9
31	10
31	13
31	11
30	8
30	10
30	13
24	4
24	5
24	7
24	13
24	11
24	16
28	4
28	10
28	18
28	13
28	5
29	4
29	7
29	8
29	10
29	5
32	4
32	8
32	10
32	11
32	5
32	15
3	10
3	11
3	6
33	7
33	10
33	9
33	19
\.


--
-- Data for Name: pizzas; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY pizzas (id, id_base, nom, slogan, picture, long_desc, prix_small, prix_big, stars, id_category, active) FROM stdin;
2	2	Milano	simple et efficace	hot.png	une longue descprition si besoin	6.99	10.99	3	Traditionnelle	t
4	1	Perra&Marco	des vrais morceaux de marco dedans	hot.png	une longue descprition si besoin	7.99	12.99	2	Du Chef	t
28	1	aaaa	aaaaaaaaaa	e49491535fd96d0b049d205d31195554		12	12	0	Traditionnelle	f
24	2	La Stéphanoise	Spéciale pour notre meilleur client	ec9d661f21979c8b543d50f13a627d38	Pour notre meilleur client, la meilleur pizza qu'il soit avec le meilleurs ingredients	12	14	0	Du Chef	t
29	2	bbbb	bbbbbb	b219cee080ccb00b221e351b41f6748d		12.05	12.11	0	Traditionnelle	f
33	2	Marinello	Directement venue de venise, une pizza pleine de saveur	2080069df8c1cb5acd6ed06b216dceb5	lore ipsum dolore sit amet,lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet, lore ipsum dolore sit amet	10.90	13.90	0	Regionnale	t
23	1	L'Italienne	la tradition de la pizza cuite au four à bois	test.jpg	mMagnifique pizza de tradition avec de la tomate trop bonne	12	13	0	Regionnale	t
5	2	Landaise	parceque	hot.png	une longue descprition si besoin	8.99	13.99	0	Regionnale	t
1	3	Hot&chili	forte a vous arracher la langue	hot.png	une longue descprition si besoin	7.99	12.99	2	Voyageuse	t
31	3	qsdd	qdff	2cdb946ae835f671d4fb2d11eac8ce62		11	12	0	Traditionnelle	f
30	3	cccc	ccccc	a5e3ed24f34e554bab9259834ab0ba24		12	13	0	Traditionnelle	f
32	3	L'américaine	Le gout du grand Ouest américain	bb5cd5a8407b8d4eb1be3a1fd75a813f	blablablablalbal	23.09	34.00	0	Regionnale	t
3	3	Copparella	Invention labellisé	487bf1f60d4c772a8925a19dcc71a998	une longue descprition si besoin	9.99	15.99	1	Du Chef	t
\.


--
-- Name: pizzas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('pizzas_id_seq', 33, true);


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY spatial_ref_sys  FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: louis
--

COPY users (id, nom, prenom, login, passwrd, tel, mail, role) FROM stdin;
2	DOE	Joe	joe	joe	0558901538	steph@helo.com	0
3	ARC	Janne	Janne	Janne	0558901538	steph@helo.com	0
4	Lorraine	Janine	Janine	Janine	0558901538	steph@helo.com	0
5	Larrère	Brice	Brice	Brice	0558901538	steph@helo.com	0
6	Anderson	Pam	Pam	Pam	0558901538	steph@helo.com	0
7	Richard	Richard	Richard	Richard	0558901538	steph@helo.com	0
8	Lous	Louis	Louis	Louis	0558901538	steph@helo.com	0
9	Chang	jacky	jacky	jacky	0558901538	steph@helo.com	0
10	Lee	Bruce	Bruce	Bruce	0558901538	steph@helo.com	0
13	joe		joe	joe@joe.com	\N	\N	0
1	PONTEINS	Stéphane Louis Albert	steff	$1$E4xj0q.e$Oh4g7oNi27ykUOdmXDSbm/	0558901538	steph@trust.net	0
14	test		test	$1$rJ4OILPm$Qo1rzcZI9ARvmaedGJ5UU/	\N	test	0
15	Louis		pizzaiolo	$1$tbnncGbk$/65KqVK19ueUIeiVU3QXF.	\N	louis@pizza-louis.com	1
16	josé		josé	$1$NUh0xA3B$qH8t/4M7zq2jczbU3SdB50	\N	jose@hotmail.com	0
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: louis
--

SELECT pg_catalog.setval('users_id_seq', 16, true);


SET search_path = topology, pg_catalog;

--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: postgres
--

COPY topology  FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: postgres
--

COPY layer  FROM stdin;
\.


SET search_path = public, pg_catalog;

--
-- Name: category_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (nom);


--
-- Name: commandes_pizzas_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes_pizzas
    ADD CONSTRAINT commandes_pizzas_pkey PRIMARY KEY (id);


--
-- Name: commandes_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes
    ADD CONSTRAINT commandes_pkey PRIMARY KEY (id);


--
-- Name: comments_news_id_comment_key; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_news
    ADD CONSTRAINT comments_news_id_comment_key UNIQUE (id_comment);


--
-- Name: comments_pizza_id_comment_key; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_pizzas
    ADD CONSTRAINT comments_pizza_id_comment_key UNIQUE (id_comment);


--
-- Name: comments_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- Name: news_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: pizzas_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizzas
    ADD CONSTRAINT pizzas_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: commandes_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes
    ADD CONSTRAINT commandes_id_client_fkey FOREIGN KEY (id_client) REFERENCES users(id);


--
-- Name: commandes_pizzas_id_commande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes_pizzas
    ADD CONSTRAINT commandes_pizzas_id_commande_fkey FOREIGN KEY (id_commande) REFERENCES commandes(id);


--
-- Name: commandes_pizzas_id_pizza_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY commandes_pizzas
    ADD CONSTRAINT commandes_pizzas_id_pizza_fkey FOREIGN KEY (id_pizza) REFERENCES pizzas(id);


--
-- Name: comments_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_id_user_fkey FOREIGN KEY (id_user) REFERENCES users(id);


--
-- Name: comments_news_id_comment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_news
    ADD CONSTRAINT comments_news_id_comment_fkey FOREIGN KEY (id_comment) REFERENCES comments(id);


--
-- Name: comments_news_id_news_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_news
    ADD CONSTRAINT comments_news_id_news_fkey FOREIGN KEY (id_news) REFERENCES news(id);


--
-- Name: comments_pizza_id_comment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_pizzas
    ADD CONSTRAINT comments_pizza_id_comment_fkey FOREIGN KEY (id_comment) REFERENCES comments(id);


--
-- Name: comments_pizza_id_pizza_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY comments_pizzas
    ADD CONSTRAINT comments_pizza_id_pizza_fkey FOREIGN KEY (id_pizza) REFERENCES pizzas(id);


--
-- Name: pizza_ingredient_id_ingredient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizza_ingredient
    ADD CONSTRAINT pizza_ingredient_id_ingredient_fkey FOREIGN KEY (id_ingredient) REFERENCES ingredients(id);


--
-- Name: pizza_ingredient_id_pizza_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizza_ingredient
    ADD CONSTRAINT pizza_ingredient_id_pizza_fkey FOREIGN KEY (id_pizza) REFERENCES pizzas(id);


--
-- Name: pizzas_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizzas
    ADD CONSTRAINT pizzas_category_fkey FOREIGN KEY (id_category) REFERENCES category(nom);


--
-- Name: pizzas_id_base_fkey; Type: FK CONSTRAINT; Schema: public; Owner: louis
--

ALTER TABLE ONLY pizzas
    ADD CONSTRAINT pizzas_id_base_fkey FOREIGN KEY (id_base) REFERENCES ingredients(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

