import React from 'react'

const ImagHelper = ({product}) => {
    const imageurl = product ? product.image : `https://lp2.hm.com/hmgoepprod?set=quality[79],source[/f5/c4/f5c4939114fcc731acfada4ebb68f1da42cad909.jpg],origin[dam],category[men_tshirtstanks_shortsleeve],type[DESCRIPTIVESTILLLIFE],res[m],hmver[1]&call=url[file:/product/main]`
    return (
        <div className="rounded border border-success p-2">
            <img src={imageurl}
            style={{ maxHeight: "100%", maxWidth: "100%"}}
            className="mb-3 rounded"
            alt=""/>
        </div>
    )
}

export default ImagHelper
