import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faShieldHalved, faTable } from '@fortawesome/free-solid-svg-icons'
import DataWithIconDescription from '../components/dataWithIconDescription'

const Home: NextPage = () => {
    return (
        <div>
            <div className={'flex flex-col justify-center items-center'}>
                <div className={'flex gap-2 mt-10'}>
                    <a className={'text-primary text-3xl font-semibold'}>eat</a>
                    <a className={'text-primary text-3xl font-semibold text-green-600'}>&lt;smarter&gt;</a>
                    <a className={'text-primary text-3xl font-semibold'}>live</a>
                    <a className={'text-primary text-3xl font-semibold text-green-600'}>&lt;better&gt;</a>
                </div>
                <div className={'mt-4 text-wildBlue font-thin'}>
                    Achieve your goals by tracking your food and learning along the way
                </div>
            </div>
            <div className={'flex w-full mt-6 justify-center'}>
                <Image src={'/landing-background-left.png'} alt={'Landing'} height={200} width={300} />
                <div className={'imageWithGradient'}>
                    <Image src={'/landing-image.png'} alt={'Landing'} height={200} width={300} />
                </div>
                <Image src={'/landing-background-right.png'} alt={'Landing'} height={200} width={300} />
                <div className={'absolute mt-48 p-8 pb-4 rounded-xl w-10/12 mx-56 bg-lightGray'}>
                    <div className={'flex gap-12 justify-center items-center rounded-xl p-4'}>
                        <DataWithIconDescription
                            icon={faUsers}
                            title={'Over 5 million users'}
                            description={'Join the community to get tips and inspiration from other users.'}
                        />
                        <DataWithIconDescription
                            icon={faShieldHalved}
                            title={'Data privacy & security'}
                            description={
                                'We take the security of our users seriously - we will never sell your account data to third parties.'
                            }
                        />
                        <DataWithIconDescription
                            icon={faTable}
                            title={'Accurate nutrition data'}
                            description={'Be confident that you food you log has the correct nutrition data.'}
                        />
                    </div>
                </div>
                <button
                    className={
                        'absolute p-3 px-8 bg-blue-900 text-white mt-44 text-sm tracking-widest font-medium rounded-3xl'
                    }
                >
                    <div className={'flex gap-4'}>
                        <Image src={'/google-play.png'} alt={'Google Play'} width={20} height={20} />
                        <div className={'normal-case font-light'}>Get it on Google Play</div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Home
