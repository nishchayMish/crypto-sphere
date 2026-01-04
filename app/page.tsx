import Image from 'next/image'
import bitcoin from "@/public/bitcoin.webp"
import DataTable from '@/components/DataTable'
import Link from 'next/link';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name', 
    cellClassName: 'name-cell', cell: (coin) => {
      const item = coin.item;
      return(
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} height={36} width={36} />
          <p>{item.name}</p>
        </Link>
      )
    }
  },
  {
    header: '24h Change',
    cellClassName: 'name-cell', cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
      
      return(
        <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
          <p>
            {isTrendingUp ? (
              <TrendingUp width={16} height={36}/>
              ):
              <TrendingDown width={16} height={36}/>
            }
            {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
          </p>
        </div>
      )
    }
  },
  {
    header: 'Price',
    cellClassName: 'price-cell', cell: (coin) => coin.item.data.price
  }
]

const trendingCoinsData: TrendingCoin[] = [
  {
    item: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      market_cap_rank: 1,
      thumb: "/bitcoin.webp",
      large: "/bitcoin.webp",
      data: {
        price: 70113,
        price_change_percentage_24h: {
          usd: 2.82,
        },
      },
    },
  },
  {
    item: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      market_cap_rank: 2,
      thumb: "/ethereum.webp",
      large: "/ethereum.webp",
      data: {
        price: 3820,
        price_change_percentage_24h: {
          usd: -0.64,
        },
      },
    },
  },
  {
    item: {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      market_cap_rank: 5,
      thumb: "/solana.webp",
      large: "/solana.webp",
      data: {
        price: 148,
        price_change_percentage_24h: {
          usd: 3.21,
        },
      },
    },
  },
];

const page = () => {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <div id='coin-overview'>
          <div className='header'>
            <Image src={bitcoin}
              width={56}
              height={56}
              alt='bitcoin-logo'
            />
            <div className='info'>
              <p>Bitcoin / BTC</p>
              <h1>$70,113.00</h1>
            </div>
          </div>
        </div>
        <p>Trending Coins</p>
       <DataTable
          data={trendingCoinsData}
          columns={columns}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
        />

      </section> 

      <section className='w-full mt-7 space-y-4'>
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page
