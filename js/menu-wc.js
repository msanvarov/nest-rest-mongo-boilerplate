'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">starter documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-b85c015271543339e5a2293eaa2ce0aa0ac8dedc96c523bb99a8b96369bf98524a2cc9b294421285145fdebc655dd99932ab200096dffcbb32d396a4dd1e8c28"' : 'data-target="#xs-controllers-links-module-AppModule-b85c015271543339e5a2293eaa2ce0aa0ac8dedc96c523bb99a8b96369bf98524a2cc9b294421285145fdebc655dd99932ab200096dffcbb32d396a4dd1e8c28"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b85c015271543339e5a2293eaa2ce0aa0ac8dedc96c523bb99a8b96369bf98524a2cc9b294421285145fdebc655dd99932ab200096dffcbb32d396a4dd1e8c28"' :
                                            'id="xs-controllers-links-module-AppModule-b85c015271543339e5a2293eaa2ce0aa0ac8dedc96c523bb99a8b96369bf98524a2cc9b294421285145fdebc655dd99932ab200096dffcbb32d396a4dd1e8c28"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-b85c015271543339e5a2293eaa2ce0aa0ac8dedc96c523bb99a8b96369bf98524a2cc9b294421285145fdebc655dd99932ab200096dffcbb32d396a4dd1e8c28"' : 'data-target="#xs-injectables-links-module-AppModule-b85c015271543339e5a2293eaa2ce0aa0ac8dedc96c523bb99a8b96369bf98524a2cc9b294421285145fdebc655dd99932ab200096dffcbb32d396a4dd1e8c28"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b85c015271543339e5a2293eaa2ce0aa0ac8dedc96c523bb99a8b96369bf98524a2cc9b294421285145fdebc655dd99932ab200096dffcbb32d396a4dd1e8c28"' :
                                        'id="xs-injectables-links-module-AppModule-b85c015271543339e5a2293eaa2ce0aa0ac8dedc96c523bb99a8b96369bf98524a2cc9b294421285145fdebc655dd99932ab200096dffcbb32d396a4dd1e8c28"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-447dad2ba0ba9698abae4bcd23979d5b81f246983a05125623ec7760e6a5869334f14f389c73100cb3e4afc022d2979f9cb26970ee6c701c1c000051370ab80d"' : 'data-target="#xs-controllers-links-module-AuthModule-447dad2ba0ba9698abae4bcd23979d5b81f246983a05125623ec7760e6a5869334f14f389c73100cb3e4afc022d2979f9cb26970ee6c701c1c000051370ab80d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-447dad2ba0ba9698abae4bcd23979d5b81f246983a05125623ec7760e6a5869334f14f389c73100cb3e4afc022d2979f9cb26970ee6c701c1c000051370ab80d"' :
                                            'id="xs-controllers-links-module-AuthModule-447dad2ba0ba9698abae4bcd23979d5b81f246983a05125623ec7760e6a5869334f14f389c73100cb3e4afc022d2979f9cb26970ee6c701c1c000051370ab80d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-447dad2ba0ba9698abae4bcd23979d5b81f246983a05125623ec7760e6a5869334f14f389c73100cb3e4afc022d2979f9cb26970ee6c701c1c000051370ab80d"' : 'data-target="#xs-injectables-links-module-AuthModule-447dad2ba0ba9698abae4bcd23979d5b81f246983a05125623ec7760e6a5869334f14f389c73100cb3e4afc022d2979f9cb26970ee6c701c1c000051370ab80d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-447dad2ba0ba9698abae4bcd23979d5b81f246983a05125623ec7760e6a5869334f14f389c73100cb3e4afc022d2979f9cb26970ee6c701c1c000051370ab80d"' :
                                        'id="xs-injectables-links-module-AuthModule-447dad2ba0ba9698abae4bcd23979d5b81f246983a05125623ec7760e6a5869334f14f389c73100cb3e4afc022d2979f9cb26970ee6c701c1c000051370ab80d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CaslModule.html" data-type="entity-link" >CaslModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CaslModule-394dfe91f625f773ab2c6f36a548635880e611126b01c79ad76a979407ccb62c5bae1a153fe429a91d49d96ae74884f78651d51e3aff58e7358277c45a885d78"' : 'data-target="#xs-injectables-links-module-CaslModule-394dfe91f625f773ab2c6f36a548635880e611126b01c79ad76a979407ccb62c5bae1a153fe429a91d49d96ae74884f78651d51e3aff58e7358277c45a885d78"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CaslModule-394dfe91f625f773ab2c6f36a548635880e611126b01c79ad76a979407ccb62c5bae1a153fe429a91d49d96ae74884f78651d51e3aff58e7358277c45a885d78"' :
                                        'id="xs-injectables-links-module-CaslModule-394dfe91f625f773ab2c6f36a548635880e611126b01c79ad76a979407ccb62c5bae1a153fe429a91d49d96ae74884f78651d51e3aff58e7358277c45a885d78"' }>
                                        <li class="link">
                                            <a href="injectables/CaslFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaslFactory</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-5979b1522760217e67ee93e19ce17c15f70dd3af8e18de0ff5353df73e405689ab4b74dfc59f107b9784519706b141c8014af442cc274485d51d23e7a38fe0db"' : 'data-target="#xs-controllers-links-module-UsersModule-5979b1522760217e67ee93e19ce17c15f70dd3af8e18de0ff5353df73e405689ab4b74dfc59f107b9784519706b141c8014af442cc274485d51d23e7a38fe0db"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-5979b1522760217e67ee93e19ce17c15f70dd3af8e18de0ff5353df73e405689ab4b74dfc59f107b9784519706b141c8014af442cc274485d51d23e7a38fe0db"' :
                                            'id="xs-controllers-links-module-UsersModule-5979b1522760217e67ee93e19ce17c15f70dd3af8e18de0ff5353df73e405689ab4b74dfc59f107b9784519706b141c8014af442cc274485d51d23e7a38fe0db"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-5979b1522760217e67ee93e19ce17c15f70dd3af8e18de0ff5353df73e405689ab4b74dfc59f107b9784519706b141c8014af442cc274485d51d23e7a38fe0db"' : 'data-target="#xs-injectables-links-module-UsersModule-5979b1522760217e67ee93e19ce17c15f70dd3af8e18de0ff5353df73e405689ab4b74dfc59f107b9784519706b141c8014af442cc274485d51d23e7a38fe0db"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-5979b1522760217e67ee93e19ce17c15f70dd3af8e18de0ff5353df73e405689ab4b74dfc59f107b9784519706b141c8014af442cc274485d51d23e7a38fe0db"' :
                                        'id="xs-injectables-links-module-UsersModule-5979b1522760217e67ee93e19ce17c15f70dd3af8e18de0ff5353df73e405689ab4b74dfc59f107b9784519706b141c8014af442cc274485d51d23e7a38fe0db"' }>
                                        <li class="link">
                                            <a href="injectables/CaslFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaslFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/DeleteUserPolicyHandler.html" data-type="entity-link" >DeleteUserPolicyHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/PoliciesGuard.html" data-type="entity-link" >PoliciesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IPolicyHandler.html" data-type="entity-link" >IPolicyHandler</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});