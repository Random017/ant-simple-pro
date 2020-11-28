import React, { memo,useEffect,useMemo} from 'react'
import {Dropdown,Menu, Spin } from 'antd'
import {Link } from "react-router-dom"
import {MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons';
import {layoutProps} from '@/interfaces'
import {FullScreeOut} from '@/components/layout/layoutTable'
import {useDispatch ,useSelector} from 'react-redux';
import {SAGA_GET_USER_INFO} from '@/redux/constants/sagaType'
import HeadImage from '@/components/headImage'
import style from './head.module.scss'
import {responsiveConfig} from '@/utils/varbile'
import SvgIcon from '@/components/svgIcon'
import { CSSTransition } from 'react-transition-group';
import { MenuInfo } from 'rc-menu/lib/interface';
import {confirm} from '@/utils/function'
import { useHistory } from "react-router-dom";
import {localStorage} from '@/assets/js/storage'
import { createSelector } from 'reselect'
import News from './new'

export type topbarProps={onToggle:Function} & layoutProps;

const TopBar:React.FC<topbarProps> = memo(function TopBar({collapsed,onToggle,width,setIsMobileDrawer}) {
    const history=useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type:SAGA_GET_USER_INFO});
    }, [dispatch]);

    const selectNumOfDoneTodos = createSelector(           
        [(state:reduceStoreType) => state.user.getUserInfo,(state:reduceStoreType) => state.user.loadingUserInfo],
        (getUserInfo, loadingUserInfo) =>[getUserInfo,loadingUserInfo] as const
    );
  
    const [getUserInfo,loadingUserInfo]=useSelector(selectNumOfDoneTodos); 
    
    const isMobileDevice=useMemo(()=>width!<responsiveConfig.mobileInnerWidth?true:false,[width]);

    const tagOption=({ key}:MenuInfo)=>{
       if(key==='2'){
            confirm(()=>{
                localStorage.clear();
                history.push(`/login?rp=${+new Date()}`);
            },'确定要退出登录吗？');
       }
    }

    const dropdown=()=>(
            <Menu onClick={tagOption}>
                <Menu.Item key='1'>
                   <Link to="/userInfo">个人信息</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key='2'>
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>
    );

    const options=()=>{
        setIsMobileDrawer!(isMobileDevice);
        onToggle(!collapsed);  
    }
    
    return (
            <div className={`${style.head} clearfix`}>
                <div className={`${style.headLeft} fl`}>
                    <div className={style.logon}>
                        <Link to="/home">
                            <SvgIcon iconClass='logon' fontSize='30px'/>
                            <CSSTransition in={!isMobileDevice} classNames="fade" timeout={200} unmountOnExit>
                               <h2>Ant Simple Pro</h2>
                            </CSSTransition>
                        </Link>
                    </div>
                    <div className={`${style.menu}`} onClick={options}>
                        {collapsed ?<MenuUnfoldOutlined className={style.icon}/>:<MenuFoldOutlined className='icon'/>}
                    </div>
                </div>
                <div className={`${style.menuList} fr`}>
                    <News/>
                    <FullScreeOut className={style.icon}/>
                    <Dropdown overlay={dropdown} placement="bottomCenter">
                        <div className={`${style.propsUser}`}>
                            {
                               loadingUserInfo?<>
                                    <HeadImage url={getUserInfo.iconUrl}/>
                                    <span>{getUserInfo.username?getUserInfo.username:'帅锋锋'}</span>
                               </>:<Spin size="small"/>  
                            }
                        </div>
                    </Dropdown>
                </div>
        </div>
    )
})

export default TopBar;

