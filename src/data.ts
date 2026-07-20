import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'kivoagency',
    title: 'Kivo Agency',
    url: 'https://kivoagency.com.br/',
    description: 'Website oficial e landing page institucional premium para agência de marketing digital. Possui design futurista, animações fluidas de alto padrão, SEO técnico otimizado para os primeiros lugares do Google e design 100% focado em geração de leads qualificados.',
    category: 'Site Institucional',
    tags: ['React', 'Tailwind CSS', 'Next.js', 'SEO Otimizado', 'Copy Persuasiva'],
    stats: 'Performance de 99% no Lighthouse'
  },
  {
    id: 'pagvend',
    title: 'PagVend',
    url: 'https://pagvend.vercel.app/',
    description: 'Página de alta conversão voltada para o mercado de vendas online e intermediação financeira. Desenvolvida sob conceitos rígidos de neuromarketing, com elementos visuais que geram escassez, confiabilidade, facilitação de leitura e botões de chamada rápida para checkout.',
    category: 'Landing Page',
    tags: ['SPA React', 'Animações Motion', 'Conversão de Checkout', 'Responsive Design'],
    stats: 'Aumento de 35% nas conversões'
  },
  {
    id: 'kivommedicc',
    title: 'Kivom Medic',
    url: 'https://kivommedicc.vercel.app/',
    description: 'Landing page especializada para profissionais da saúde e clínicas médicas premium. Focada no agendamento de consultas com layout limpo que inspira confiança, elegância médica, seção de tratamentos detalhada e botões estratégicos de direcionamento para o WhatsApp.',
    category: 'Landing Page',
    tags: ['Vite + React', 'Estética Clean', 'Agendamento WhatsApp', 'Mobile Ready'],
    stats: 'Agendamentos 2x mais rápidos'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description: 'Páginas de vendas de alta conversão. Ideal para infoprodutos, e-books e captações.',
    badge: 'Mais Vendido',
    features: [
      'Copywriting direcionado e persuasivo',
      'Carregamento em menos de 1.5s',
      'Layout focado inteiramente na conversão (CRO)',
      'Integração direta com o seu WhatsApp'
    ]
  },
  {
    id: 'sites-institucionais',
    title: 'Sites Completos',
    description: 'Sites institucionais elegantes que consolidam a autoridade digital e a presença online da sua empresa no mercado moderno.',
    badge: '',
    features: [
      'Múltiplas páginas institucionais explicativas',
      'Painel gerenciável opcional pelo cliente',
      'SEO avançado para aparecer no Google',
      'Layout premium e exclusivo'
    ]
  },
  {
    id: 'apps',
    title: 'Aplicativos & Sistemas',
    description: 'Sistemas web robustos e aplicativos integrados sob medida, pensados para otimizar processos da sua empresa ou rodar o seu SaaS.',
    badge: '',
    features: [
      'Interfaces dinâmicas e responsivas de alto nível',
      'Banco de dados integrado e escalável',
      'Foco total na experiência de uso (UX/UI)',
      'Suporte técnico e manutenção contínua'
    ]
  }
];
