import React, { useState ,memo} from 'react';
import {
    MinimalButton,
    Spinner,
    TextBox
} from '@react-pdf-viewer/core';
import {
    NextIcon,
    PreviousIcon,
} from '@react-pdf-viewer/search';
import Box from '@material-ui/core/Box';
import OutlinedCardmini from './minicard';
import { Scrollbar } from 'react-scrollbars-custom';
import { MoonLoader } from 'react-spinners';
import Modal from 'react-modal';

const SearchStatus = {
    NotSearchedYet: 0,
    Searching: 1,
    FoundResults: 2
};

const SearchSidebar = memo((props) => {
    const {searchPluginInstance} = props;
    const [searchStatus, setSearchStatus] = useState(SearchStatus.NotSearchedYet);
    const [matches, setMatches] = useState([]);
    
    const [word, setWord] = useState([]);            //数据库搜索
    const { Search, highlight} = searchPluginInstance;
    const renderMatchSample = (match) => {
        const wordsBefore = match.pageText.substr(match.startIndex - 20, 20);
        let words = wordsBefore.split(' ');
        words.shift();
        const begin = words.length === 0 ? wordsBefore : words.join(' ');

        const wordsAfter = match.pageText.substr(match.endIndex, 60);
        words = wordsAfter.split(' ');
        words.pop();
        const end = words.length === 0 ? wordsAfter : words.join(' ');

        return (
            <div>
                {begin}
                <span style={{ backgroundColor: 'rgb(255, 255, 0)' }}>
                    {match.pageText.substring(match.startIndex, match.endIndex)}
                </span>
                {end}
            </div>
        );
    };

    return (
        <div>
        <Search>
            {(renderSearchProps) => {
                const {currentMatch, keyword, setKeyword, jumpToMatch, search,jumpToNextMatch, jumpToPreviousMatch} =
                    renderSearchProps;
                const [loading, setLoading] = useState(false);
                const handleSearchKeyDown = (e) => {
                    //console.log(e);
                    if (e.key === 'Enter' && keyword) {
                        setSearchStatus(SearchStatus.Searching);
                        setLoading(true);
                        search().then((matches) => {
                            setSearchStatus(SearchStatus.FoundResults);
                            setLoading(false); // 清除loading状态
                            setMatches(matches);
                        });
                        e.preventDefault();//阻止页面默认submit跳转
                        let names = window.api.getTrans(keyword);
                        //console.log(names)
                        setWord(names)
                    }

                };

                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                    >
                        <div style={{ padding: '.5rem' }}>
                            <div style={{ position: 'relative' }}>
                                
                                <TextBox
                                    placeholder="按下回车进行搜索~"
                                    value={keyword}
                                    onChange={setKeyword}
                                    onKeyDown={handleSearchKeyDown}
                                />
                                    <Modal isOpen={loading} onRequestClose={() => setLoading(false)} style={{
                                    overlay: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        backdropFilter: 'blur(20px)' // 添加磨砂效果
                                    },
                                    content: {
                                        width: '50%',
                                        height: '30%',
                                        margin: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fff',
                                        borderRadius: '15px',
                                        opacity: 0.8 // 添加半透明
                                    }
                                    }}>
                                    <MoonLoader />
                                    <h1>&nbsp;&nbsp;正在构建书籍全局索引！</h1>
                                    </Modal>
                                {searchStatus === SearchStatus.Searching && (
                                    <div
                                        style={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            bottom: 0,
                                            position: 'absolute',
                                            right: '.5rem',
                                            top: 0,
                                        }}
                                    >
                                        <Spinner size="1.5rem" />
                                    </div>
                                )}
                            </div>
                        </div>
                        {searchStatus === SearchStatus.FoundResults && (
                            <>
                                {matches.length === 0 && 'Not found'}
                                {matches.length > 0 && (
                                    <>
                                        <div
                                            style={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                padding: '.5rem',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    color: 'rgba(0, 0, 0, .5)',
                                                    fontSize: '.8rem',
                                                    marginRight: '.5rem',
                                                }}
                                            >
                                                已查找到 {matches.length} 个结果！
                                            </div>
                                            <div style={{ marginLeft: 'auto', marginRight: '.5rem' }}>
                                                <MinimalButton onClick={jumpToPreviousMatch}>
                                                    <PreviousIcon />
                                                </MinimalButton>
                                            </div>
                                            <MinimalButton onClick={jumpToNextMatch}>
                                                <NextIcon />
                                            </MinimalButton>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '50%'}}> 
                                                <Scrollbar style={{ height: '100%' }}>
                                                    {matches.map((match, index) => (
                                                        <div key={index} style={{ margin: '1rem 0' }}>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    marginBottom: '.5rem',
                                                                }}
                                                            >
                                                                <div>原文：{index + 1}</div>
                                                                <div
                                                                    style={{
                                                                        color: 'rgba(0, 0, 0, .5)',
                                                                        fontSize: '.8rem',
                                                                        textAlign: 'right',
                                                                    }}
                                                                >
                                                                    页数： {match.pageIndex + 1}
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    backgroundColor:
                                                                        currentMatch === index + 1 ? 'rgba(0, 0, 0, .1)' : '',
                                                                    border: '1px solid rgba(0, 0, 0, .2)',
                                                                    borderRadius: '.25rem',
                                                                    cursor: 'pointer',
                                                                    overflowWrap: 'break-word',
                                                                    padding: '.5rem',
                                                                }}
                                                                onClick={() => jumpToMatch(index + 1)}
                                                            >
                                                                {renderMatchSample(match)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Scrollbar>
                                            </div>
                                            {word ? (
                                                <div style={{ width: '50%', padding: '1rem' }}>
                                                    <div>相关的释义：</div>
                                                    {word.map(word => (
                                                    <Box className="animate-right-to-left" word={word.key} trans={word.value} key={word.key}>
                                                        <OutlinedCardmini word={word.key} trans={word.value}
                                                            Keyword={word.key}
                                                            highlight={highlight}
                                                            next={jumpToNextMatch}
                                                            previous={jumpToPreviousMatch}
                                                        />
                                                    </Box>
                                                    ))}
                                                </div>
                                            ) : (null)}
                                        </div>
                                        <span>
[1]许宝华主编.《汉语方言大词典 修订本》[M].北京:中华书局,2020.
                                        </span>
                                        <span>
[2]钱曾怡主编.《山东方言研究》[M].山东:齐鲁书社,2001.
                                        </span>
                                        <span>
[3]汉语大词典编辑委员会,汉语大词典编纂处编纂《汉语大词典》[M].上海：上海辞书出版社,2018.
                                        </span>
                                        <span>
[4]徐复岭编著.《〈金瓶梅词话〉〈醒世姻缘传〉〈聊斋俚曲集〉语言词典》[M].上海:上海辞书出版社,2018.
                                        </span>
                                        <span>
[5]晁瑞.《醒世姻缘传》方言词历史演变研究[M].北京:中国社会科学出版社,2014.
                                        </span>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                );
            }}
        </Search>
        </div>
    );
})

export default SearchSidebar;
