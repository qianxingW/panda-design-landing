// react 依赖
import React, { useEffect, useRef, useImperativeHandle, useState } from 'react'

// 引入swiper组件
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'

SwiperCore.use([])

const CarouselSwiper = (props, ref) => {
	const { data, activeTabKey } = props

	const [controlledSwiper, setControlledSwiper] = useState({})

	const swiper = useRef()
	useEffect(() => {
		if (!swiper.current) return
		swiper.current.slideTo(activeTabKey)
	}, [activeTabKey])
	useImperativeHandle(ref, () => props)
	return (
		<Swiper
			// 切换效果
			// effect={'coverflow'}
			slidesOffsetBefore={440}
			// slide之间的距离（单位px）
			spaceBetween={72}
			// 闭环
			loop={true}
			slidesPerView={'auto'}
			// 分页器
			pagination={{ el: '.swiper-pagination', clickable: true }}
			// 鼠标悬浮变手掌
			grabCursor={false}
			// Slide切换到另一个Slide时执行(activeIndex发生改变)
			// onSlideChange={e => setControlledSwiper(e)}
			// 首次加载
			onSwiper={e => {
				swiper.current = e
				setControlledSwiper(e)
			}}
			controller={{
				control: controlledSwiper,
			}}
		>
			{data.map((item, index) => {
				return <SwiperSlide key={index}>{item}</SwiperSlide>
			})}
			<div className="swiper-pagination"></div>
		</Swiper>
	)
}

export default React.forwardRef(CarouselSwiper)
